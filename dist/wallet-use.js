$('.do-min').click(function() {
    if (isNaN($('input[name=\'quantity\']').val() / 1) == false) {
        var quantity = $('input[name=\'quantity\']').val();
    } else {
        var quantity = 1;
    }
    if ($('input[name=\'quantity\']').val() > 1) {
        $('input[name=\'quantity\']').val(parseInt(quantity) - parseInt(1));
    }
    priceChnage();
});
$('.do-plus').click(function() {
    if (isNaN($('input[name=\'quantity\']').val() / 1) == false) {
        var quantity = $('input[name=\'quantity\']').val();
    } else {
        var quantity = 1;
    }
    $('input[name=\'quantity\']').val(parseInt(quantity) + parseInt(1));
    priceChnage();
});

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
let web3Modal
let provider;
let selectedAccount;
let remaningNFT;

$("#mint-nft").click(function(e) {
    mint();
});

$("#wallet-connect").click(function(e) {
    onConnect();
});

$("#input-quantity").change(function(e) {
    priceChnage();
});

function priceChnage(){
    var count = parseInt($("#input-quantity").val());
    if(count > 5) {
        count = 5;
        $("#input-quantity").val('5');
    }
    var price = (count * parseFloat(0.08)).toFixed(3);
    $("#ETH").html(price);
}

window.addEventListener('load', async () => {
    init();
});

async function onConnect() {
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    provider.on("accountsChanged", (accounts) => {
        init2();
    });
    provider.on("chainChanged", (chainId) => {
        init2();
    });
    provider.on("networkChanged", (networkId) => {
        init2();
    });
    await init2();
}

var abi = [{"inputs":[{"internalType":"string","name":"baseURI","type":"string"},{"internalType":"address payable","name":"creator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"AddToWhiteList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"CreateNonkiShiba","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"RemoveWhiteListedMultipleAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"RemovedFromWhiteList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"WhiteListMultipleAddress","type":"event"},{"inputs":[],"name":"MAX_BY_MINT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_HOLDING_NFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_NFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getWhiteListStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhiteListed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"val","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeWhiteListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"removeWhiteListedMultipleAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"creator","type":"address"}],"name":"setCreatorAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLimit","type":"uint256"}],"name":"updateHoldingLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLimit","type":"uint256"}],"name":"updateMaxMintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"whiteListAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"whiteListMultipleAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var contractAddress = '0x590527F9369e874f2F7eBcF63A5D3675127971Cc';


var userAddress = '';
var contract = undefined;

async function init() {
    web3 = new Web3('https://mainnet.infura.io/v3/195e467de58149a192611648d405df09');
    contract = new web3.eth.Contract(abi, contractAddress);
    let totalMint = await contract.methods.totalMint().call();
    remaningNFT = 7777 - totalMint;
    if(totalMint==7777) {
        $("#mint-nft").html('All NFT Sold');
        $("#mint-nft").attr("disabled", true);
    }
    $("#totalMint").html(remaningNFT);
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
               56: 'https://bsc-dataseed.binance.org/'
            },
            chainId: 56,
            network: 'binance',
          }
        }
      };

      web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions, 
      });
      console.log("Web3Modal instance is", web3Modal);

}

async function init2() {
    if (typeof web3 !== 'undefined') {
        const web3 = new Web3(provider);
        contract = new web3.eth.Contract(abi, contractAddress);
        web3.eth.getAccounts(function(err, accounts) {
            if (err != null) {
                swal({
                    title: "Error Found",
                    text: err,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            } else if (accounts.length === 0) {
                swal({
                    title: "Error Found",
                    text: 'Your Wallet is Locked. Please Unlock It To Use DAPP',
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            } else if (web3.currentProvider.chainId != 1) {
                swal({
                    title: "Error Found",
                    text: 'Make Sure You Are Using the Ethereum Network',
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            } else {
                userAddress = accounts[0];
                userStatsUpdate();
                setInterval(function(){ 
                    userStatsUpdate();
                }, 5000);
            }
        });
    } else {
        swal({
            title: "Error Found",
            text: 'No Wallet or Extension Found To Connect DAPP',
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
}

async function userStatsUpdate() {
    $("#wallet-connect").hide();
    $.ajax({
          url: "https://nonkishiba.com/api.php?address="+userAddress
    }).done(function(data) {
        checkstatus(data);
    });
}

async function checkstatus(data) {
   if(data=="Yes") 
   {
       $("#mint-nft").show();
   }
   else 
   {
       $("#mint-nft").show();
       $("#mint-nft").html('Not Whitelisted');
       $("#mint-nft").attr("disabled", true);
   }
}

async function mint() {
    try {
        $("#error").html('');
        var count = parseInt($("#input-quantity").val());
        var price = count * 0.001 * 10**18;
        if(count==0)
        {
           $("#error").html('Mint at least 1 NFT');
        }
        else if(count > remaningNFT)
        {
            $("#error").html("Can't Mint More Than Remaining NFT");
        }
        else if(count > 5)
        {
             $("#error").html("Can't Mint More Than 5 NFT");
        }
        else
        {
			 contract.methods.mint(userAddress,count).estimateGas({from: userAddress, value: price}).then(function(gasAmount){
				 contract.methods.mint(userAddress,count).send({from: userAddress, value: price}, function(error, tx) {
					if (error) {
						swal({
							title: "Error Found",
							text: error.message,
							type: "error",
							showCancelButton: false,
							confirmButtonClass: "btn-danger",
							confirmButtonText: "Ok",
							closeOnConfirm: false
						});
					} 
					else 
					{
						$("#link1").attr("href", 'https://etherscan.io/tx/'+tx);
						$("#link2").attr("href", 'https://etherscan.io/tx/'+tx);
						$('#waiting').modal('show'); 
						checktxnstatus(tx);
					}
				}); 
			 }).catch(function(error){
                  swal({
                    title: "Error Found",
                    text: 'Insufficient Fund for Minting in Your Wallet',
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                   });
              });	 
        }
    } catch (error) {
        swal({
            title: "Error Found",
            text: error,
            type: "danger",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
}

function checktxnstatus(transactionHash) {
    let web3 = new Web3('https://mainnet.infura.io/v3/195e467de58149a192611648d405df09');
    web3.eth.getTransactionReceipt(transactionHash, function(error, result) {
        if(result!=null)
        {
            if(result.status) {
                var html = "";
                result.logs.forEach((element) => {
                    if(element.topics.length==2)
                    {
                        id = element.topics[1];
                        html = html+ '<a href="https://opensea.io/assets/0x590527F9369e874f2F7eBcF63A5D3675127971Cc/'+id+'" target="_blank">Go to Newly Minted Nonki Shiba</a>';
                    }
                });
                if(html!="")
                {
                    $('#waiting').modal('toggle');
                    $("#pro_btn").html(html);
                    $('#complete').modal('show'); 
                }
            }
            else 
            {
                setTimeout(function(){ 
                    checktxnstatus(transactionHash);
                }, 2000);
            }
        }
        else
        { 
            setTimeout(function(){ 
                    checktxnstatus(transactionHash);
            }, 2000);
        }
    });
}
