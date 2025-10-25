<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['userid'])) {
    die('❌ ERROR: User not logged in. Please <a href="log in.php">login</a> first.');
}

echo "<h2>🔍 Order System Diagnostic</h2>";
echo "<style>body{font-family:Arial;padding:20px;} .success{color:green;} .error{color:red;} .info{color:blue;}</style>";

// Test 1: Check session
echo "<h3>1. Session Check</h3>";
if (isset($_SESSION['userid'])) {
    echo "<p class='success'>✅ User logged in - User ID: " . $_SESSION['userid'] . "</p>";
} else {
    echo "<p class='error'>❌ No user session found</p>";
}

// Test 2: Check if files exist
echo "<h3>2. File Check</h3>";
$files = [
    'config/Database.php',
    'class/Order.php',
    'save_order.php',
    'get_order_details.php'
];

foreach ($files as $file) {
    if (file_exists($file)) {
        echo "<p class='success'>✅ $file exists</p>";
    } else {
        echo "<p class='error'>❌ $file NOT FOUND</p>";
    }
}

// Test 3: Try to connect to database
echo "<h3>3. Database Connection</h3>";
try {
    include_once("config/Database.php");
    $connectDB = new Database();
    $db = $connectDB->getConnection();
    
    if ($db) {
        echo "<p class='success'>✅ Database connected successfully</p>";
        
        // Test 4: Check if tables exist
        echo "<h3>4. Table Check</h3>";
        $tables = ['orders', 'order_items', 'user'];
        
        foreach ($tables as $table) {
            $query = "SHOW TABLES LIKE '$table'";
            $stmt = $db->query($query);
            if ($stmt->rowCount() > 0) {
                echo "<p class='success'>✅ Table '$table' exists</p>";
            } else {
                echo "<p class='error'>❌ Table '$table' does NOT exist</p>";
            }
        }
        
    } else {
        echo "<p class='error'>❌ Failed to connect to database</p>";
    }
} catch (Exception $e) {
    echo "<p class='error'>❌ Database error: " . $e->getMessage() . "</p>";
}

// Test 5: Check if Order class can be loaded
echo "<h3>5. Order Class Check</h3>";
try {
    if (file_exists("class/Order.php")) {
        include_once("class/Order.php");
        $order = new Order($db);
        echo "<p class='success'>✅ Order class loaded successfully</p>";
        
        // Test 6: Try to create a test order
        echo "<h3>6. Test Order Creation</h3>";
        echo "<form method='POST' action=''>";
        echo "<button type='submit' name='test_order' style='padding:10px 20px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;'>Create Test Order</button>";
        echo "</form>";
        
        if (isset($_POST['test_order'])) {
            $testItems = [
                [
                    'id' => 1,
                    'name' => 'Test Product',
                    'price' => 100,
                    'quantity' => 2
                ]
            ];
            $testTotal = 200;
            
            $orderId = $order->createOrder($_SESSION['userid'], $testItems, $testTotal);
            
            if ($orderId) {
                echo "<p class='success'>✅ Test order created successfully! Order ID: $orderId</p>";
                echo "<p class='info'>You can check the 'orders' and 'order_items' tables in phpMyAdmin</p>";
            } else {
                echo "<p class='error'>❌ Failed to create test order</p>";
            }
        }
        
    } else {
        echo "<p class='error'>❌ Order.php file not found</p>";
    }
} catch (Exception $e) {
    echo "<p class='error'>❌ Error loading Order class: " . $e->getMessage() . "</p>";
}

// Test 7: JavaScript fetch test
echo "<h3>7. API Test</h3>";
echo "<button onclick='testAPI()' style='padding:10px 20px;background:#28a745;color:white;border:none;border-radius:5px;cursor:pointer;'>Test save_order.php API</button>";
echo "<pre id='api-result' style='background:#f5f5f5;padding:15px;margin-top:10px;border-radius:5px;'></pre>";

echo "<script>
function testAPI() {
    const result = document.getElementById('api-result');
    result.textContent = 'Testing API...';
    
    const testData = {
        items: [
            {id: 1, name: 'Test Product', price: 100, quantity: 2}
        ],
        total: 200
    };
    
    fetch('save_order.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(testData)
    })
    .then(response => response.json())
    .then(data => {
        result.textContent = JSON.stringify(data, null, 2);
        if (data.success) {
            result.style.color = 'green';
        } else {
            result.style.color = 'red';
        }
    })
    .catch(error => {
        result.textContent = 'Error: ' + error.message;
        result.style.color = 'red';
    });
}
</script>";

echo "<hr>";
echo "<p><a href='home.php'>← Back to Home</a> | <a href='order_history.php'>View Order History</a></p>";
?>