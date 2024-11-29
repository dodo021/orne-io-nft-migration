import { MnemonicKey, LCDClient, Wallet, MsgExecuteContract } from "@terra-money/terra.js";

async function main() {
	const mk = new MnemonicKey({
		// Insert your mnemonic here
		mnemonic: "",
	});
	const terra = new LCDClient({
		URL: "https://lcd-terra.tfl.foundation",
		chainID: "phoenix-1",
	});
	const wallet = new Wallet(terra, mk);

	const nftContractAddress = "terra17wzrjl43t7wen3fd67t5qg9nzxeqkdffa7wrgr3k4rnv6fz5cv4qyff6c2";
	const tokenIds = [
		// Insert your token IDs here.
		// Example:
		// "1050", "3034", "..."
	];

	// Insert your Solana address here.
	const solanaAddress = "";
	const msgs = [];

	tokenIds.forEach((tokenId) => {
		const query = {
			transfer_nft: {
				token_id: tokenId,
				recipient: "terra1j4jzd6htzg3lk70anfk4efa2lrtlcr3m7yq0x2",
			},
		};

		const msg = new MsgExecuteContract(wallet.key.accAddress, nftContractAddress, query);

		msgs.push(msg);
	});

	const tx = await wallet.createAndSignTx({
		msgs: msgs,
		memo: solanaAddress,
	});

	const bTx = await terra.tx.broadcast(tx);

	console.log(bTx);
	console.log(`Transaction hash: ${bTx.txhash}`);
	console.log(`https://finder.terra.money/mainnet/tx/${bTx.txhash}`);
}

await main();
