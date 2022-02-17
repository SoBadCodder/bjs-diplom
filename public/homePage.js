"use strict";
let logoutButton = new LogoutButton;

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            console.error(`${response.error}`);
        }
    });
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error(`Ошибка вывода профиля`);
    }
});

let ratesBoard = new RatesBoard;

function getCurrentBoard() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getCurrentBoard();
setInterval(getCurrentBoard, 60000);

let moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = ((data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Кошелёк успешно пополнен`);
        } else {
            moneyManager.setMessage(response.success, `Произошла ошибка ${response.error}`);
        }
    });
});
moneyManager.conversionMoneyCallback = ((data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Конвертация успешно выполнена`);
        } else {
            moneyManager.setMessage(response.success, `Произошла ошибка ${response.error}`);
        }
    });
});
moneyManager.sendMoneyCallback = ((data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Перевод успешно выполнен`);
        } else {
            moneyManager.setMessage(response.success, `Произошла ошибка ${response.error}`);
        }
    });
});

let favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});
favoritesWidget.addUserCallback = ((data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, `Пользователь был добавлен в избранное`)
        } else {
            favoritesWidget.setMessage(response.success, `Произошла ошибка ${response.error}`);
        }
    });
});
favoritesWidget.removeUserCallback = ((data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, `Пользователь был удален из избранного`)
        } else {
            favoritesWidget.setMessage(response.success, `Произошла ошибка ${response.error}`);
        }
    });
});