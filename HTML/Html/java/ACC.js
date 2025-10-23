// Alert function
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    alertContainer.innerHTML = `
                <div class="alert ${alertClass}">
                    <i class="fas ${icon}"></i>
                    <span>${message}</span>
                </div>
            `;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Profile form submission
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
        showAlert('Profile updated successfully!', 'success');
    }, 500);
});

// Password form submission
document.getElementById('passwordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'danger');
        return;
    }

    if (newPassword.length < 6) {
        showAlert('New password must be at least 6 characters long', 'danger');
        return;
    }

    // Simulate password change
    setTimeout(() => {
        showAlert('Password changed successfully!', 'success');
        document.getElementById('passwordForm').reset();
    }, 500);
});