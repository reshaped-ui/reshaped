"use client";

import Button from "components/Button";
import View from "components/View";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import { range } from "utilities/helpers";

import s from "./Pagination.module.css";

import type * as T from "./Pagination.types";

const PaginationControlled: React.FC<T.ControlledProps> = (props) => {
	const {
		total,
		page: selectedPage = 1,
		onChange,
		pageAriaLabel,
		previousAriaLabel,
		nextAriaLabel,
		className,
		attributes,
	} = props;
	const selectionRadius = 1;
	const edgeRadius = 1;
	const pages = [];
	const minLengthToSplit = (edgeRadius + 1) * 2 + selectionRadius * 2 + 1;
	const hasHead = total > minLengthToSplit && selectedPage - selectionRadius > edgeRadius + 2;
	const hasTail = total > minLengthToSplit && selectedPage + selectionRadius < total - edgeRadius;

	/**
	 * Calculate the amount of rendered pages + dots
	 * Removing head or tail also removes their dots
	 */
	let count = selectionRadius * 2 + 1;
	if (!hasHead) count += edgeRadius + 1;
	if (!hasTail) count += edgeRadius + 1;

	const selectionStart = hasHead
		? Math.min(total - count + 1, Math.max(1, selectedPage - selectionRadius))
		: 1;
	const selectionEnd = hasTail ? Math.min(selectionStart + count - 1, total) : total;

	if (hasHead) pages.push(...range(1, edgeRadius), null);
	pages.push(...range(selectionStart, selectionEnd));
	if (hasTail) pages.push(null, ...range(total - edgeRadius + 1, total));

	const changePage = (page: number) => {
		const resolvedValue = Math.min(total, Math.max(1, page));

		onChange?.({ page: resolvedValue });
	};

	return (
		<View direction="row" align="center" gap={1} className={className} attributes={attributes}>
			<Button
				variant="ghost"
				size="small"
				icon={IconChevronLeft}
				onClick={() => changePage(selectedPage - 1)}
				disabled={selectedPage === 1}
				attributes={{ "aria-label": previousAriaLabel }}
			/>

			{pages.map((page, index) => {
				if (page === null) {
					return (
						<View width={7} align="center" key={`dots-${index}`}>
							...
						</View>
					);
				}

				return (
					<Button
						size="small"
						key={index}
						variant={page === selectedPage ? "solid" : "ghost"}
						color={page === selectedPage ? "primary" : "neutral"}
						onClick={() => changePage(page)}
						attributes={{
							"aria-label": pageAriaLabel?.({ page }),
							"aria-current": page === selectedPage,
						}}
						className={s.page}
					>
						{page}
					</Button>
				);
			})}

			<Button
				variant="ghost"
				size="small"
				className={s.page}
				icon={IconChevronRight}
				onClick={() => changePage(selectedPage + 1)}
				disabled={selectedPage === total}
				attributes={{ "aria-label": nextAriaLabel }}
			/>
		</View>
	);
};

PaginationControlled.displayName = "PaginationControlled";

export default PaginationControlled;
