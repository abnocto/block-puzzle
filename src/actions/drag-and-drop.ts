import type {CoordsDto} from '../types';

type Options = {
	handleDragged: (coords: CoordsDto) => void;
	handleDropped: (coords: CoordsDto) => void;
};

export const dragAndDrop = (targetElement: HTMLElement, options: Options) => {
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

		const [cellElement] = document.elementsFromPoint(event.clientX, event.clientY);

		options.handleDragged({
			x: Number(cellElement.getAttribute('data-x')),
			y: Number(cellElement.getAttribute('data-y'))
		});

		addEventListener('pointermove', handlePointermove);
		addEventListener('pointerup', handlePointerup);
	};

	const handlePointermove = (event: PointerEvent) => {
		cloneElement.style.transform = `translate(${event.pageX - deltaX}px, ${event.pageY - deltaY}px)`;
	};

	const handlePointerup = (event: PointerEvent) => {
		removeEventListener('pointermove', handlePointermove);
		removeEventListener('pointerup', handlePointerup);

		const cellElement = document.elementsFromPoint(event.clientX, event.clientY)
			.find((element) => element.getAttribute('data-droppable') === 'true');

		if (cellElement) {
			options.handleDropped({
				x: Number(cellElement.getAttribute('data-x')),
				y: Number(cellElement.getAttribute('data-y'))
			});

			cloneElement.parentNode?.removeChild(cloneElement);

			return;
		}

		const handleTransitionend = () => {
			cloneElement.removeEventListener('transitionend', handleTransitionend);
			cloneElement.parentNode?.removeChild(cloneElement);
			targetElement.style.visibility = 'visible';
		};

		cloneElement.style.transition = 'transform 0.5s';
		cloneElement.style.transform = `translate(${initX}px, ${initY}px)`;
		cloneElement.addEventListener('transitionend', handleTransitionend);
	};

	targetElement.addEventListener('pointerdown', handlePointerdown);

	return {
		destroy() {
			targetElement.removeEventListener('pointerdown', handlePointerdown);
		}
	};
};
