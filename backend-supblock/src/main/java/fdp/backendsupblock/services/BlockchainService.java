package fdp.backendsupblock.services;

import fdp.backendsupblock.type.StoreValue;
import generated.fdp.SimpleStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Uint;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.core.methods.response.Transaction;
import org.web3j.tx.ClientTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;
import java.util.Collections;

@Service
public class BlockchainService {

    private final Web3j web3j;
    String contractAddress = "0x63B2A26D545628178b4159d2C5bb2B780e6465D6";
    String ownerAddress = "0x2dF0EA0100c25729782Fb58683C97eEb9cB2Aaa5";
    TransactionManager txManager;

    @Autowired
    public BlockchainService(Web3j web3j) {
        this.txManager = new ClientTransactionManager(web3j, ownerAddress);
        this.web3j = web3j;
    }

    public StoreValue storeValue(int number) throws Exception {
        SimpleStorage simpleStorage = SimpleStorage.load(
                contractAddress,
                web3j,
                txManager,
                new DefaultGasProvider()
        );
        simpleStorage.setValue(BigInteger.valueOf(number)).send();

        BigInteger value = simpleStorage.getValue().send();
        int blockNumber = web3j.ethBlockNumber().send().getBlockNumber().intValue();

        return new StoreValue(value, blockNumber);
    }

    public String retrieveValue(String transactionHash) throws Exception {
        EthTransaction ethTransaction = web3j.ethGetTransactionByHash(transactionHash).send();
        Transaction transaction = ethTransaction.getTransaction().get();
        String contractAddress = transaction.getTo();
        BigInteger blockNumber = transaction.getBlockNumber();

        Function function = new Function(
                "getValue",
                Collections.emptyList(),
                Collections.singletonList(new TypeReference<Uint>() {
                })
        );

        String encodedFunction = FunctionEncoder.encode(function);
        EthCall ethCall = web3j.ethCall(
                org.web3j.protocol.core.methods.request.Transaction.createEthCallTransaction(
                        transaction.getFrom(), contractAddress, encodedFunction),
                DefaultBlockParameter.valueOf(blockNumber)
        ).send();

        String storedValueHex = ethCall.getValue();
        if (storedValueHex == null || storedValueHex.isEmpty()) {
            throw new Exception("Failed to retrieve stored value at block: " + blockNumber);
        }

        BigInteger storedValue = new BigInteger(storedValueHex.substring(2), 16);
        return "Stored Value in block " + blockNumber + ": " + storedValue;
    }

}

