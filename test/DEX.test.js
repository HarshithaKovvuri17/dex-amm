import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

describe("DEX", function () {
  let dex, tokenA, tokenB;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    tokenA = await MockERC20.deploy("Token A", "TKA");
    tokenB = await MockERC20.deploy("Token B", "TKB");

    const DEX = await ethers.getContractFactory("DEX");
    dex = await DEX.deploy(tokenA.address, tokenB.address);

    await tokenA.approve(dex.address, ethers.utils.parseEther("1000000"));
    await tokenB.approve(dex.address, ethers.utils.parseEther("1000000"));
  });

  describe("Deployment", function () {
    it("should set correct token addresses", async function () {
      expect(await dex.tokenA()).to.equal(tokenA.address);
      expect(await dex.tokenB()).to.equal(tokenB.address);
    });
  });

  describe("Liquidity Management - Initial", function () {
    it("should allow initial liquidity provision", async function () {
      await dex.addLiquidity(
        ethers.utils.parseEther("100"),
        ethers.utils.parseEther("200")
      );

      const [reserveA, reserveB] = await dex.getReserves();

      expect(reserveA).to.equal(ethers.utils.parseEther("100"));
      expect(reserveB).to.equal(ethers.utils.parseEther("200"));
    });

    it("should mint LP tokens for first provider", async function () {
      await dex.addLiquidity(
        ethers.utils.parseEther("100"),
        ethers.utils.parseEther("200")
      );

      const lpBalance = await dex.liquidity(owner.address);
      expect(lpBalance).to.be.gt(0);
    });

    it("should update total liquidity correctly", async function () {
      await dex.addLiquidity(
        ethers.utils.parseEther("100"),
        ethers.utils.parseEther("200")
      );

      const lpBalance = await dex.liquidity(owner.address);
      const totalLiquidity = await dex.totalLiquidity();

      expect(totalLiquidity).to.equal(lpBalance);
    });
  });
});
