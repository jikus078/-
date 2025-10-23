const form = document.getElementById('signupForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');
const successMessage = document.getElementById('successMessage');

// ตรวจสอบรหัสผ่านตรงกันหรือไม่
function validatePassword() {
    if (confirmPassword.value !== '' && password.value !== confirmPassword.value) {
        passwordError.style.display = 'block';
        confirmPassword.style.borderColor = '#e74c3c';
        return false;
    } else {
        passwordError.style.display = 'none';
        confirmPassword.style.borderColor = '#ddd';
        return true;
    }
}

confirmPassword.addEventListener('input', validatePassword);
password.addEventListener('input', function() {
    if (confirmPassword.value !== '') {
        validatePassword();
    }
});

// ตรวจสอบเบอร์โทรศัพท์
phoneInput.addEventListener('input', function() {
    if (this.value.length > 0 && !this.validity.valid) {
        phoneError.style.display = 'block';
        this.style.borderColor = '#e74c3c';
    } else {
        phoneError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// ตรวจสอบฟอร์มก่อนส่ง
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validatePassword()) {
        confirmPassword.focus();
        return;
    }
    
    if (!phoneInput.validity.valid) {
        phoneInput.focus();
        return;
    }
    
    // แสดงข้อความสำเร็จ
    successMessage.style.display = 'block';
    form.reset();
    
    // ซ่อนข้อความหลังจาก 3 วินาที
    setTimeout(function() {
        successMessage.style.display = 'none';
    }, 3000);
    
    // ในโปรเจ็กต์จริง จะส่งข้อมูลไปยัง server ที่นี่
    console.log('Form submitted successfully!');
});