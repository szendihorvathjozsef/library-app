import React from "react";
import userEvent from "@testing-library/user-event";
import { Book } from "shared/types";
import BookForm from "./BookForm";
import { render, fireEvent } from "shared/util/test-utils";
import { act } from "react-dom/test-utils";

describe("<BookForm />", () => {
	let component: React.ReactElement;

	function onSubmit(values: Book) {}

	beforeEach(() => {
		component = <BookForm onSubmit={onSubmit} />;
	});

	describe("Form errors", () => {
		it("should display errors", () => {
			const { getByLabelText, getByText, getAllByText } = render(component);

			let Title = getByLabelText("book.properties.title");
			let PageCount = getByLabelText("book.properties.pageCount");
			let Description = getByLabelText("book.properties.description");
			let submit = getByText("button.submit");

			expect(Title).toHaveAttribute("aria-invalid", "false");
			expect(PageCount).toHaveAttribute("aria-invalid", "false");
			expect(Description).toHaveAttribute("aria-invalid", "false");

			act(() => {
				fireEvent.submit(submit);
			});

			expect(getAllByText("validation:required")).toEqual(3);
		});
	});
});
