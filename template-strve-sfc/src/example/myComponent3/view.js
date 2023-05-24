const data = {
	a: true,
	b: 5,
	c,
	width: 200,
	arr: [1, 2, 3],
};

function c() {
	setData(() => {
		data.a = !data.a;
		// data.width += 100;
		// data.arr.push('2');
	});
}
