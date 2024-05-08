const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;

    let walletAddress;
    while(true){
      wallet = ethers.Wallet.createRandom()
      walletAddress = await wallet.getAddress()
      if(walletAddress < threshold) {
        break;
      }
    }

    wallet = wallet.connect(ethers.provider);
    const signer = ethers.provider.getSigner(0);

    await signer.sendTransaction({
      to: walletAddress,
      value: ethers.utils.parseEther('1.0')
    });

    await game.connect(wallet).win();

    //require(bytes20(msg.sender) < bytes20(threshold), "Nope. Try again!");


    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
