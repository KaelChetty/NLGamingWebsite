
/* ==========================================
   NEXT LEVEL GAMING & ESPORTS ARENA
   JAVASCRIPT FUNCTIONALITY
========================================== */


/* ==========================================
   CURRENCY FORMATTER
========================================== */

function formatCurrency(amount) {

    return "R" + Number(amount).toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


/* ==========================================
   PRICE CALCULATOR
========================================== */

const calculatorForm = document.getElementById("calculatorForm");

if (calculatorForm) {

    calculatorForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const experience = document.getElementById("experience");
        const quantity = parseInt(document.getElementById("quantity").value);
        const price = parseFloat(experience.value);

        if (!experience.value || quantity < 1 || isNaN(quantity)) {
            alert("Please select an experience and enter a valid quantity.");
            return;
        }

        const subtotal = price * quantity;

        let discountRate = 0;

        if (quantity >= 4) {
            discountRate = 0.15;
        } else if (quantity === 3) {
            discountRate = 0.10;
        } else if (quantity === 2) {
            discountRate = 0.05;
        }

        const discount = subtotal * discountRate;
        const discountedTotal = subtotal - discount;
        const vat = discountedTotal * 0.15;
        const total = discountedTotal + vat;

        document.getElementById("subtotal").textContent =
            formatCurrency(subtotal);

        document.getElementById("discount").textContent =
            formatCurrency(discount);

        document.getElementById("vat").textContent =
            formatCurrency(vat);

        document.getElementById("total").textContent =
            formatCurrency(total);

        document.getElementById("discountMessage").textContent =
            "You received a " + (discountRate * 100) +
            "% discount on your booking.";

    });

}


/* ==========================================
   BOOKING FORM
========================================== */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const bookingDateInput = document.getElementById("bookingDate");

    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    bookingDateInput.min = localToday;

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const experience = document.getElementById("experience").value;
        const bookingDate = document.getElementById("bookingDate").value;
        const guests = parseInt(document.getElementById("guests").value);
        const requests = document.getElementById("requests").value.trim();

        if (!fullName || !email || !phone || !experience || !bookingDate || guests < 1) {
            alert("Please complete all required booking information.");
            return;
        }

        const selectedDate = new Date(bookingDate + "T00:00:00");

        if (selectedDate < new Date(localToday + "T00:00:00")) {
            alert("Please select a valid future booking date.");
            return;
        }

        const prices = {
            "Virtual Reality Experience": 750,
            "Racing Simulator Challenge": 750,
            "Escape Room Challenge": 750,
            "Esports Gaming": 1500,
            "Birthday Party Experience": 1500,
            "VIP Gaming Experience": 1500,
            "Ultimate Gamer Pass": 1500
        };

        const price = prices[experience];

        if (!price) {
            alert("Please select a valid experience.");
            return;
        }

        const subtotal = price * guests;

        let discountRate = 0;

        if (guests >= 4) {
            discountRate = 0.15;
        } else if (guests === 3) {
            discountRate = 0.10;
        } else if (guests === 2) {
            discountRate = 0.05;
        }

        const discount = subtotal * discountRate;
        const discountedTotal = subtotal - discount;
        const vat = discountedTotal * 0.15;
        const total = discountedTotal + vat;

        const bookingDetails = {
            fullName,
            email,
            phone,
            experience,
            bookingDate,
            guests,
            requests,
            subtotal,
            discount,
            discountRate,
            vat,
            total
        };

        localStorage.setItem(
            "nlGamingBooking",
            JSON.stringify(bookingDetails)
        );

        window.location.href = "summary.html";

    });

}


/* ==========================================
   BOOKING SUMMARY
========================================== */

const confirmBookingButton = document.getElementById("confirmBooking");

if (confirmBookingButton) {

    const savedBooking = localStorage.getItem("nlGamingBooking");

    if (!savedBooking) {

        document.getElementById("summaryMessage").textContent =
            "No booking information found. Please complete the booking form first.";

        confirmBookingButton.disabled = true;

    } else {

        const booking = JSON.parse(savedBooking);

        document.getElementById("summaryName").textContent = booking.fullName;
        document.getElementById("summaryEmail").textContent = booking.email;
        document.getElementById("summaryPhone").textContent = booking.phone;
        document.getElementById("summaryExperience").textContent = booking.experience;
        document.getElementById("summaryDate").textContent = booking.bookingDate;
        document.getElementById("summaryGuests").textContent = booking.guests;

        document.getElementById("summaryRequests").textContent =
            booking.requests || "None";

        document.getElementById("summarySubtotal").textContent =
            formatCurrency(booking.subtotal);

        document.getElementById("summaryDiscount").textContent =
            formatCurrency(booking.discount);

        document.getElementById("summaryDiscountRate").textContent =
            (booking.discountRate * 100) + "%";

        document.getElementById("summaryVat").textContent =
            formatCurrency(booking.vat);

        document.getElementById("summaryTotal").textContent =
            formatCurrency(booking.total);

        confirmBookingButton.addEventListener("click", function() {

            window.location.href = "confirmation.html";

        });

    }

}


/* ==========================================
   BOOKING CONFIRMATION
========================================== */

const bookingReferenceElement = document.getElementById("bookingReference");

if (bookingReferenceElement) {

    const savedBooking = localStorage.getItem("nlGamingBooking");

    if (savedBooking) {

        const booking = JSON.parse(savedBooking);

        if (!booking.reference) {

            booking.reference =
                "NLG-" + Date.now().toString().slice(-8);

            localStorage.setItem(
                "nlGamingBooking",
                JSON.stringify(booking)
            );

        }

        document.getElementById("bookingReference").textContent =
            booking.reference;

        document.getElementById("confirmName").textContent =
            booking.fullName;

        document.getElementById("confirmExperience").textContent =
            booking.experience;

        document.getElementById("confirmDate").textContent =
            booking.bookingDate;

        document.getElementById("confirmGuests").textContent =
            booking.guests;

        document.getElementById("confirmTotal").textContent =
            formatCurrency(booking.total);

    } else {

        bookingReferenceElement.textContent = "No booking found.";

    }

}


/* ==========================================
   CONTACT FORM
========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            alert("Please complete all the required fields.");

            return;

        }

        document.getElementById("contactMessage").textContent =
            "Thank you, " + name +
            "! Your enquiry has been submitted successfully.";

        contactForm.reset();

    });

}
