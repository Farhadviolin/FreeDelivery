async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Token = await ethers.getContractFactory("LoyaltyToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("LoyaltyToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
