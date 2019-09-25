<template>
	<view class="content">
		<ul class="list-group" v-if="BindCardStatus == 400?false:true">
			<li class="list-group-item" v-for="(item,index) in cardList" :key="index" @tap="editCard('id')">
				<div class="panel panel-danger">
				  <div class="panel-body ovfl">
				   <text class="txlf">{{item.name}}</text>  
					<span class="txrg">
						<switch color='#0f0' @change="statusToggle" />
					</span> 
				  </div>
				  <div class="panel-footer">
					 {{item.num}}
				  </div>
				</div>
			</li>
		</ul>
	</view>
</template>

<script>
	import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../api/https.js';
	export default {
		data(){
			return {
				startReceiveOrder:true,
				cardList: [{
						id: 1,
						name: '建设银行',
						num: '123456',
					},
					{
						id: 2,
						name: '工商银行',
						num: '987654',
					},
				],
				BindCardStatus: null,
				statusSwitch: true
			}
			
		},
		onShow(){
			this.getBankCard()   //进入该页面即发送请求
		},
		// onLoad(){
		// 	this.getBankCard()
		// },
		methods: {
			getBankCard(){
				https.get('bankcard?status=succeeded').then(res=>{
					console.log(res)
				})
			
			},
			statusToggle(e){
				uni.request({
					url: this.$hostUrl + `bankcard/${id}/${e.target.value}`,
					method: 'PUT',
					header: {Authorization:'Bearer ' + localStorage.getItem('token')},
					success: res => {
						// console.log(e.target.value)
						console.log(res)
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
	
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}
	.orderStatus {
		margin: 100rpx auto;
		position: relative;
	}
	.statusStyle {
		color: #d81e06;
		font-size: 14px;
		font-weight: 700;
		margin-bottom: 80rpx;
	}
	.receiveOrder {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 200rpx;
		background-color: #fdaf82;
		color: white;
		font-size: 16px;
		margin: auto;
	}
	.disFl {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.panel-body .txlf {
			float: left;
		}
		
		.panel-body .txrg {
			float: right;
		}
	.ovfl {
		overflow: hidden;
		}
</style>