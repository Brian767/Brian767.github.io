window.addEventListener("DOMContentLoaded",() => {
	const tree = new BinaryTree(
		[
			0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,
			0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,
			0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
			0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
			0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
			0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,
			0,1,0,0,0,1,0,1,1,0,1,1,0,1,0,0,0,1,0,
			0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,
			0,0,0,1,0,0,0,1,1,0,1,1,0,0,0,1,0,0,0,
			0,0,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,
			0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,
			0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0
		],
		19,
		24
	);
	const display = () => {
		const pre = document.querySelector("pre");

		if (pre) pre.textContent = tree.structureToString;
	};
	display();

	document.querySelector("button")?.addEventListener("click",() => {
		tree.invert();
		display();
	});
});

class BinaryTree {
	structure: Binary[] = [];
	cols: number;
	rows: number;

	/**
	 * @param structure Array of binary values
	 * @param cols Number of columns
	 * @param rows Number of rows
	 */
	constructor(structure: Binary[], cols: number, rows: number) {
		this.structure.push(...structure);
		this.cols = cols;
		this.rows = rows;
	}
	/** Convert the value array to text, which is divided into rows. */
	get structureToString(): string {
		const { structure, cols, rows } = this;
		const asStrings = structure.map(n => n.toString());

		for (let r = 1; r < rows; ++r) {
			// insert line breaks
			asStrings.splice(r * cols + (r - 1),0,"\n");
		}

		return asStrings.join("");
	}
	/** Flip the values. */
	invert(): void {
		this.structure = this.structure.map(n => +!n as Binary);
	}
}

type Binary = 0 | 1;