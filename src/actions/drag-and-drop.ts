export const dragAndDrop = (targetElement: HTMLElement) => {
	let cloneElement: HTMLElement;
	let initX: number;
	let initY: number;
	let deltaX: number;
	let deltaY: number;

	const handlePointerdown = (event: PointerEvent) => {
		const targetElementRect = targetElement.getBoundingClientRect();

		cloneElement = targetElement.cloneNode(true) as HTMLElement;
		cloneElement.style.position = 'absolute';
		cloneElement.style.top = '0px';
		cloneElement.style.left = '0px';

		initX = targetElement.offsetLeft;
		initY = targetElement.offsetTop;
		deltaX = event.clientX - targetElementRect.x;
		deltaY = event.clientY - targetElementRect.y;

		handlePointermove(event);
		document.body.appendChild(cloneElement);
		targetElement.style.visibility = 'hidden';

		addEventListener('pointermove', handlePointermove);
		addEventListener('pointerup', handlePointerup);
	};

	const handlePointermove = (event: PointerEvent) => {
		cloneElement.style.transform = `translate(${event.pageX - deltaX}px, ${event.pageY - deltaY}px)`;
	};

	const handlePointerup = () => {
		removeEventListener('pointermove', handlePointermove);
		removeEventListener('pointerup', handlePointerup);

		const handleTransitionend = () => {
			cloneElement.removeEventListener('transitionend', handleTransitionend);
			cloneElement.parentNode?.removeChild(cloneElement);
			targetElement.style.visibility = 'visible';
		};

		if (document.body.contains(targetElement)) {
			cloneElement.style.transition = 'transform 0.5s';
			cloneElement.style.transform = `translate(${initX}px, ${initY}px)`;
			cloneElement.addEventListener('transitionend', handleTransitionend);
			return;
		}

		cloneElement.parentNode?.removeChild(cloneElement);
	};

	targetElement.addEventListener('pointerdown', handlePointerdown);

	return {
		destroy() {
			targetElement.removeEventListener('pointerdown', handlePointerdown);
		}
	};
};
