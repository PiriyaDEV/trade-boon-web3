App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("TradeBoon.json", function (artifact) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      App.contracts.TradeBoon = TruffleContract(artifact);
      App.contracts.TradeBoon.setProvider(App.web3Provider);

      App.showWallet();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".payment-btn", App.handlePayment);
  },

  handlePayment: function () {
    var amount = $(".total-amount").html();

    var wei_value = web3.toWei(amount, "ether");

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TradeBoon.deployed()
        .then(function (instance) {
          return instance.makeMerit(wei_value, {
            from: account,
            value: wei_value,
          });
        })
        .then(function () {
          App.showContractBalance();
          return App.showWallet();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },

  showContractBalance: function () {
    App.contracts.TradeBoon.deployed()
      .then(function (instance) {
        return instance.getBalance();
      })
      .then(function (result) {
        console.log(web3.fromWei(result.toString(), "ether"));
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  showWallet: function () {
    web3.eth.getBalance(web3.eth.accounts[0], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const balance = web3.fromWei(result.toString(), "ether");
        document.getElementById("my_balance").innerHTML = balance;
      }
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
