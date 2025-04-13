const welcome = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Sistema de Entrega</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
            color: #333;
            text-align: center;
            padding: 50px;
        }
        .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            font-size: 18px;
            line-height: 1.6;
        }
        .btn {
            background-color: #4CAF50;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 18px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Bem-vindo ao Sistema de Entrega!</h1>
        <p>Estamos muito felizes por você ter se registrado em nosso sistema. Para continuar e ativar sua conta, por favor, clique no botão abaixo para confirmar seu e-mail.</p>
        <a href="https://www.seusite.com.br/confirmar-email" class="btn">Confirmar E-mail</a>
    </div>

</body>
</html>
`;

module.exports = {
  welcome,
};