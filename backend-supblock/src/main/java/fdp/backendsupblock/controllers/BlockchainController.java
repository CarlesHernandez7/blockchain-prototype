package fdp.backendsupblock.controllers;

import fdp.backendsupblock.services.BlockchainService;
import fdp.backendsupblock.type.StoreValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlockchainController {

    private final BlockchainService blockchainService;

    public BlockchainController(BlockchainService blockchainService) {
        this.blockchainService = blockchainService;
    }

    @PostMapping("/interact/{number}")
    public StoreValue storeValue(@PathVariable int number) throws Exception {
        return blockchainService.storeValue(number);
    }

    @GetMapping("/retrieve/{transactionHash}")
    public String retrieveStoredValue(@PathVariable String transactionHash) throws Exception {
        return blockchainService.retrieveValue(transactionHash);
    }
}

