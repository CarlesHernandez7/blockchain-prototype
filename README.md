# blockchain-prototype
Allows you to create transactions to a local blockchain and retrieve its information given its hash using truffle + ganache integrated to spring boot. 

## Steps 

1. Open the truffle project (supblock folder)
2. Run ganache to initialize the blockchain
     ```
     ganache
4. In another terminal migrate the contract to the blockchain. If it works well you'll see the first transaction in ganache terminal.
   ```
   truffle migrate --network development
6. Open the spring project (backend-supblock)
7. Update the contract address and owner address in BlockchainService.java. You can check it in the terminal after migrating.<br>
   String contractAddress = "0x...";
   <br>
   String ownerAddress = "0x...";
9. Run the backend
   ```
   mvn spring-boot:run
10. Open the next.js project (frontend-supblock)
11. Run the frontend
    ```
    npm run dev
12. You have all set to interact with the blockchain, creating transactions by storing numbers and retrieving its information by inputing its hash. Check the ganache cli to see how the blocks are being created
   
