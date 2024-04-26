const mainContainer = createAndAppend("div", "class", "mainContainer", document.body);
const mainForm = createAndAppend("form", "type", "submit", mainContainer, null, null, null, "mainForm");
const mrpInput = createAndAppend("input", "type", "number", mainForm, null, null, "MRP");
const productPriceInput = createAndAppend("input", "type", "number", mainForm, null, null, "Product Price");
const productName = createAndAppend("input", "type", "text", mainForm, null, null, "Product Name");
const productQuantity = createAndAppend("input", "type", "number", mainForm, null, null, "Product Quantity");
const submitForm = createAndAppend("button", "class", "submit", mainForm, "submit", "submit", null)
const mainProductContainer = createAndAppend("div", 'class', "mainProductContainer", mainContainer)


function createAndAppend(tag, attType, attName, parent, text, value, placeholder, className) {
    let element = document.createElement(tag)

    if (!!attType && !!attName) {
        element.setAttribute(attType, attName);
    }
    if (!!parent) {
        parent.append(element);
    }
    if (!!text) {
        element.innerText = text;
    }
    if (!!value) {
        element.value = value;
    }
    if (!!placeholder) {
        element.setAttribute("placeholder", placeholder);
    }
    if (!!className) {
        element.setAttribute("class", className)
    }

    return element;
}

mainContainer.addEventListener("click", listener);
mainContainer.addEventListener("mouseover", listener);

let editCard = null;

function listener(e) {
    e.preventDefault();
    e.stopPropagation();


    // let targetElement = e.target;

    if (e.type === "click") {
        if (e.target.tagName !== "BUTTON") {
            return
        }

        // console.log(e.target)
        if (e.target.textContent === "submit") {
            const productCard = createAndAppend("div", "class", "productCard", mainProductContainer);
            const productPrices = createAndAppend("div", "class", "productPrices", productCard);
            const mrp = createAndAppend("p", "class", "productMRP", productPrices, `MRP: ${mrpInput.value}`)
            const price = createAndAppend("h1", "class", "productPrice", productPrices, `₹ ${productPriceInput.value} only`)
            const nameAndQuantity = createAndAppend("p", "class", "nameAndQuantity", productPrices, `${productName.value},${productQuantity.value} gm`)
            mrpInput.value = productPriceInput.value = productName.value = productQuantity.value = "";
        }

        if (e.target.textContent === "Edit") {
            if (!document.querySelector(".popContainer")) { // Check if the popup container doesn't exist
                const popContainer = createAndAppend("div", "class", "popContainer", mainContainer); // Create the popup container
                const cancelBtn = createAndAppend("button", "class", "popCancelbtn", popContainer, "X", "X");
                const innerForm = createAndAppend("form", "type", "submit", popContainer, null, null, null, "innerForm");
                const popMrp = createAndAppend("input", "type", "number", innerForm, null, null, "Enter Mrp", "popMrp");
                const popPrice = createAndAppend("input", "type", "number", innerForm, null, null, "Enter Price");
                const popName = createAndAppend("input", "type", "text", innerForm, null, null, "Enter Product Name");
                const popQuantity = createAndAppend("input", "type", "number", innerForm, null, null, "Enter Quantity");
                const editSubmit = createAndAppend("button", "type", "submit", innerForm, "Submit", "innerSubmit", null, "editSubmit");
            }
        }

        if (e.target.value === "innerSubmit") {
            if (editCard) {
                const popForm = e.target.closest(".innerForm")
                // console.log(editCard);

                editCard.querySelector(".productMRP").innerText = `MRP : ${popForm.children[0].value}`;
                editCard.querySelector(".productPrice").innerText = `₹ ${popForm.children[1].value} only`;
                editCard.querySelector(".nameAndQuantity").innerText = `${popForm.children[2].value},${popForm[3].value} gm`
                const popContainer = popForm.parentElement;
                popContainer.remove();

            }
        }
        if (e.target.value === "X") {
            const popContainer = document.querySelector(".popContainner")
            if (popContainer) {
                popContainer.remove();
            }
        }

        if (e.target.innerText === "Delete") {
            const delCard = e.target.closest(".productCard");
            delCard.remove()
        }

    }

    if (e.type === "mouseover") {
        if (e.target.classList[0] === "productPrices") {

            const productContainer1 = e.target;
            const buttonContainer = productContainer1.querySelector(".buttonContainer");

            if (!buttonContainer) {
                const buttonContainer = createAndAppend("div", "class", "buttonContainer", productContainer1);
                const editBtn = createAndAppend("button", "class", "editButton", buttonContainer, "Edit");
                const deleteBtn = createAndAppend("button", "class", "delButtonn", buttonContainer, "Delete")
            }
        }
    }
}