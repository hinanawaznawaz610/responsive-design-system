/* =====================================================
   TASK 16
   RESPONSIVE DESIGN SYSTEM
   JAVASCRIPT
===================================================== */


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

const $ = (selector, root = document) =>
    root.querySelector(selector);


const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = $("#menuBtn");
const mainMenu = $("#mainMenu");


menuBtn.addEventListener("click", () => {

    const isOpen =
        mainMenu.classList.toggle("open");


    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    menuBtn.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

});


/* Close mobile menu after clicking link */

mainMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mainMenu.classList.remove(
                    "open"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });



/* =====================================================
   NAVIGATION DROPDOWN
===================================================== */

const dropBtn =
    $(".nav-dropdown-btn");

const dropMenu =
    $("#componentDropdown");


dropBtn.addEventListener(
    "click",
    () => {

        const isOpen =
            dropMenu.classList.toggle(
                "open"
            );


        dropBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


/* Close dropdown when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".dropdown"
            )
        ) {

            dropMenu.classList.remove(
                "open"
            );

            dropBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);



/* =====================================================
   TOAST NOTIFICATION SYSTEM
===================================================== */

const toastRegion =
    $("#toastRegion");


function showToast(
    message,
    type = "success"
) {

    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast ${type}`;


    toast.setAttribute(
        "role",
        "status"
    );


    toast.innerHTML = `

        <span>
            ${message}
        </span>

        <button
            aria-label="Dismiss notification">
            ×
        </button>

    `;


    toastRegion.appendChild(
        toast
    );


    const closeToast = () => {

        toast.remove();

    };


    toast
        .querySelector("button")
        .addEventListener(
            "click",
            closeToast
        );


    setTimeout(
        closeToast,
        4500
    );

}


/* Success Toast */

$("#toastBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Your action was completed successfully."
            );

        }
    );


/* Error Toast */

$("#errorToastBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Something needs your attention.",
                "error"
            );

        }
    );


/* Navbar Toast */

$("#navToastBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Toast notification is working."
            );

        }
    );



/* =====================================================
   MODAL
   FOCUS TRAP + SCROLL LOCK
===================================================== */

const modal =
    $("#modal");

const modalOpeners = [

    $("#modalBtn"),

    $("#heroModalBtn")

];


const modalClose =
    $("#modalClose");


let lastFocused = null;


/* Open modal */

function openModal() {

    lastFocused =
        document.activeElement;


    modal.hidden = false;


    document.body.classList.add(
        "modal-open"
    );


    modalClose.focus();

}


/* Close modal */

function closeModal() {

    modal.hidden = true;


    document.body.classList.remove(
        "modal-open"
    );


    if (lastFocused) {

        lastFocused.focus();

    }

}


/* Add open event to both buttons */

modalOpeners.forEach(
    button => {

        button.addEventListener(
            "click",
            openModal
        );

    }
);


/* Modal buttons */

$("#modalConfirm")
    .addEventListener(
        "click",
        () => {

            closeModal();

            showToast(
                "Modal action confirmed."
            );

        }
    );


$("#modalCancel")
    .addEventListener(
        "click",
        closeModal
    );


modalClose
    .addEventListener(
        "click",
        closeModal
    );


/* Click backdrop to close */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);



/* =====================================================
   KEYBOARD MODAL CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (modal.hidden) {
            return;
        }


        /* Escape */

        if (
            event.key === "Escape"
        ) {

            closeModal();

            return;

        }


        /* Focus Trap */

        if (
            event.key === "Tab"
        ) {

            const focusableElements =
                $$(
                    `
                    button:not([disabled]),
                    [href],
                    input:not([disabled]),
                    select:not([disabled]),
                    textarea:not([disabled])
                    `,
                    modal
                );


            if (
                focusableElements.length === 0
            ) {

                return;

            }


            const first =
                focusableElements[0];

            const last =
                focusableElements[
                    focusableElements.length - 1
                ];


            /* Shift + Tab */

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            }


            /* Tab */

            else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }

    }
);



/* =====================================================
   FORM VALIDATION
===================================================== */

const form =
    $("#demoForm");


form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        let valid = true;


        $$(".field", form)
            .forEach(field => {

                const input =
                    $("input, select, textarea", field);


                if (
                    !input.checkValidity()
                ) {

                    field.classList.add(
                        "invalid"
                    );

                    field.classList.remove(
                        "valid"
                    );

                    valid = false;

                }

                else if (
                    input.value
                ) {

                    field.classList.remove(
                        "invalid"
                    );

                    field.classList.add(
                        "valid"
                    );

                }

            });


        const status =
            $("#formStatus");


        if (valid) {

            status.textContent =
                "✓ Form is valid and ready to submit.";

            status.style.color =
                "var(--green)";


            showToast(
                "Form validation passed."
            );

        }

        else {

            status.textContent =
                "Please correct the highlighted fields.";

            status.style.color =
                "var(--red)";

        }

    }
);



/* Live form validation */

$$(
    "input, select, textarea",
    form
)
.forEach(input => {

    input.addEventListener(
        "input",
        () => {

            const field =
                input.closest(
                    ".field"
                );


            if (
                input.checkValidity() &&
                input.value
            ) {

                field.classList.remove(
                    "invalid"
                );

                field.classList.add(
                    "valid"
                );

            }

            else {

                field.classList.remove(
                    "valid"
                );

            }

        }
    );

});



/* Reset form */

form.addEventListener(
    "reset",
    () => {

        setTimeout(
            () => {

                $$(".field", form)
                    .forEach(field => {

                        field.classList.remove(
                            "valid",
                            "invalid"
                        );

                    });


                $("#formStatus")
                    .textContent = "";

            },
            0
        );

    }
);



/* =====================================================
   SORTABLE DATA TABLE
===================================================== */

const rows = [

    {
        name: "Buttons",
        type: "Action",
        status: "Ready",
        score: 98
    },

    {
        name: "Forms",
        type: "Input",
        status: "Ready",
        score: 95
    },

    {
        name: "Cards",
        type: "Content",
        status: "Ready",
        score: 92
    },

    {
        name: "Modal",
        type: "Overlay",
        status: "Ready",
        score: 97
    },

    {
        name: "Toast",
        type: "Feedback",
        status: "Ready",
        score: 94
    },

    {
        name: "Data Table",
        type: "Data",
        status: "Review",
        score: 89
    },

    {
        name: "Badges",
        type: "Status",
        status: "Ready",
        score: 96
    },

    {
        name: "Avatars",
        type: "Identity",
        status: "Ready",
        score: 91
    },

    {
        name: "Pagination",
        type: "Navigation",
        status: "Review",
        score: 88
    },

    {
        name: "Navbar",
        type: "Navigation",
        status: "Ready",
        score: 93
    }

];


let currentPage = 1;

const pageSize = 5;

let sortKey = "name";

let sortAsc = true;



/* Render Table */

function renderTable() {

    const sortedRows =
        [...rows].sort(
            (a, b) => {

                const valueA =
                    a[sortKey];

                const valueB =
                    b[sortKey];


                /* Numeric sorting */

                if (
                    typeof valueA ===
                    "number"
                ) {

                    return sortAsc
                        ? valueA - valueB
                        : valueB - valueA;

                }


                /* Text sorting */

                return sortAsc
                    ? String(valueA)
                        .localeCompare(
                            String(valueB)
                        )
                    : String(valueB)
                        .localeCompare(
                            String(valueA)
                        );

            }
        );


    const totalPages =
        Math.ceil(
            sortedRows.length /
            pageSize
        );


    currentPage =
        Math.min(
            currentPage,
            totalPages
        );


    const start =
        (currentPage - 1) *
        pageSize;


    const pageRows =
        sortedRows.slice(
            start,
            start + pageSize
        );


    /* Create table rows */

    $("tbody", $("#dataTable"))
        .innerHTML = pageRows
        .map(
            row => `

                <tr>

                    <td>
                        <strong>
                            ${row.name}
                        </strong>
                    </td>

                    <td>
                        ${row.type}
                    </td>

                    <td>

                        <span class="badge ${
                            row.status === "Ready"
                                ? "badge-green"
                                : "badge-gray"
                        }">

                            ${row.status}

                        </span>

                    </td>

                    <td>
                        ${row.score}%
                    </td>

                </tr>

            `
        )
        .join("");


    /* Pagination */

    const pageNumbers =
        $("#pageNumbers");


    pageNumbers.innerHTML = "";


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "page-number";


        if (
            i === currentPage
        ) {

            button.classList.add(
                "active"
            );

        }


        button.textContent = i;


        button.setAttribute(
            "aria-label",
            `Go to page ${i}`
        );


        button.addEventListener(
            "click",
            () => {

                currentPage = i;

                renderTable();

            }
        );


        pageNumbers.appendChild(
            button
        );

    }


    $("#prevPage").disabled =
        currentPage === 1;


    $("#nextPage").disabled =
        currentPage === totalPages;

}



/* Sorting buttons */

$$(".sort-btn")
.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button.dataset.key;


                if (
                    sortKey === key
                ) {

                    sortAsc =
                        !sortAsc;

                }

                else {

                    sortKey =
                        key;

                    sortAsc =
                        true;

                }


                currentPage = 1;


                renderTable();

            }
        );

    }
);



/* Previous Page */

$("#prevPage")
    .addEventListener(
        "click",
        () => {

            if (
                currentPage > 1
            ) {

                currentPage--;

                renderTable();

            }

        }
    );



/* Next Page */

$("#nextPage")
    .addEventListener(
        "click",
        () => {

            currentPage++;

            renderTable();

        }
    );



/* Initial Table */

renderTable();