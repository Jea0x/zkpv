import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of ZKPV contracts...");

  // Get the ContractFactory and Signers
  const [deployer] = await ethers.getSigners();
  
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy CanonicalGit contract
  console.log("\n📦 Deploying CanonicalGit contract...");
  const CanonicalGit = await ethers.getContractFactory("CanonicalGit");
  const canonicalGit = await CanonicalGit.deploy();
  
  await canonicalGit.waitForDeployment();
  const canonicalGitAddress = await canonicalGit.getAddress();
  
  console.log("✅ CanonicalGit deployed to:", canonicalGitAddress);

  // Verify deployment by calling a view function
  console.log("\n🔍 Verifying deployment...");
  const totalRepos = await canonicalGit.getTotalRepositories();
  console.log("📊 Total repositories:", totalRepos.toString());

  console.log("\n🎉 Deployment completed successfully!");
  console.log("📋 Contract Addresses:");
  console.log("   CanonicalGit:", canonicalGitAddress);
  
  // Save deployment info to a file
  const deploymentInfo = {
    network: "localhost",
    contracts: {
      CanonicalGit: canonicalGitAddress
    },
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };
  
  console.log("\n💾 Deployment info saved for frontend integration");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error("❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});