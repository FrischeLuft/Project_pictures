<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Обработка загруженного файла
    if (!empty($_FILES['upload']['name'])) {
        $uploadFile = $uploadDir . basename($_FILES['upload']['name']);
        move_uploaded_file($_FILES['upload']['tmp_name'], $uploadFile);
    }

    // Сбор данных из формы
    $data = [
        'size' => $_POST['size'],
        'material' => $_POST['material'],
        'options' => $_POST['options'],
        'promocode' => $_POST['promocode'],
        'file_path' => $uploadFile ?? null
    ];

    // Чтение текущих данных из db.json
    $dbFile = 'db.json';
    if (file_exists($dbFile)) {
        $json = file_get_contents($dbFile);
        $dbData = json_decode($json, true);
    } else {
        $dbData = [];
    }

    // Добавление новых данных
    $dbData[] = $data;

    // Запись обновленных данных в db.json
    file_put_contents($dbFile, json_encode($dbData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    // Возврат ответа
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
