document.addEventListener('DOMContentLoaded', function() {
    var showDetailButtons = document.querySelectorAll('input[type="checkbox"]');
    
    showDetailButtons.forEach(function(button) {
        var detailsRow = button.parentNode.parentNode.nextElementSibling;
        var isChecked = localStorage.getItem('checkbox_' + button.id);
        if (isChecked === 'true') {
            detailsRow.style.display = 'table-row';
            button.checked = true;
        } else {
            detailsRow.style.display = 'none';
            button.checked = false;
        }
        
        button.addEventListener('change', function() {
            localStorage.setItem('checkbox_' + button.id, button.checked);
            if (button.checked) {
                detailsRow.style.display = 'table-row';
            } else {
                detailsRow.style.display = 'none';
            }
        });
    });
});

function enableButton() {
    var submitButton = document.getElementById("submitButton");
    submitButton.disabled = false;
}

function showForm() {
    var formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("hidden");
}

function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var fullName = document.getElementById('fullName').value;
    var nationalId = document.getElementById('nationalId').value;
    var birthdate = document.getElementById('birthdate').value;
    var mobileNumber = document.getElementById('mobileNumber').value;
    var email = document.getElementById('email').value;
    var response = grecaptcha.getResponse();

    if (!/^[\u0600-\u06FF\s]+$/.test(fullName)) {
        alert('الاسم الكامل يجب أن يكون باللغة العربية فقط');
        return false;
    }

    if (!/^\d{11}$/.test(nationalId)) {
        alert('الرقم الوطني يجب أن يكون مكونًا من 11 رقمًا');
        return false;
    }

    if (!birthdate) {
        alert('يرجى إدخال تاريخ الميلاد');
        return false;
    }

    if (!/^09\d{8}$/.test(mobileNumber)) {
        alert('رقم الموبايل يجب أن يبدأ بـ 09 ويكون مكونًا من 10 أرقام');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }

    if (response.length === 0) {
        alert('الرجاء إكمال Captcha');
        return false;
    }

    alert('تم إرسال النموذج بنجاح');
    showPropertyDetails();
    return false; // Prevent the form from submitting actually
}

function showPropertyDetails() {
    var radioButtonGroup = document.querySelectorAll('input[type="radio"]');
    var checkedRadio = Array.from(radioButtonGroup).find(radio => radio.checked);
    
    if (checkedRadio) {
        var propertyDetails = checkedRadio.parentNode.parentNode.querySelector('.info').innerHTML;
        var newWindow = window.open("", "_blank");
        newWindow.document.write('<html><head><title>معلومات العقار</title></head><body>');
        newWindow.document.write('<h1>معلومات العقار الذي تم اختياره:</h1>');
        newWindow.document.write('<p>' + propertyDetails + '</p>');
        newWindow.document.write('</body></html>');
        newWindow.document.close();
    } else {
        alert('لم يتم اختيار أي عقار');
    }
}
