<template>
	<view>
		<div class="container login-container">
		<form>
			<view class="select">
				<view class="uni-title uni-common-pl title">充值账户</view>
				<view class="uni-list">
					<view class="uni-list-cell disFl">
						<view class="uni-list-cell-left currentSelect">
							当前选择
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="cardList" range-key="cardNo">
								<view class="uni-input" v-model="bankCardNo">{{(cardList[index] || {}).cardNo}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column form-group">
				<view class="title">充值金额</view>
				<input type="text" required class="uni-input form-control" name="amount" placeholder="请输入充值金额" v-model="amount" />
			</view>
			
			<!-- <view class="uni-form-item uni-column">
				<view class="title">充值金额</view>
				<input class="uni-input" name="input" placeholder="请输入充值金额" />
			</view> -->
            <!-- <view class="uni-btn-v">
                                <button @tap="submit">充值</button>
                                <button type="default" @tap="cancle">取消</button>
            </view> -->
            
			<button type="button" class="btn btn-md btn-block change-btn" @tap="submit">提交充值</button>
			
			<!-- <view class="uni-title uni-common-pl">充值账户&充值金额</view>
	        <view class="uni-list">
	            <view class="uni-list-cell">
	                <view class="uni-list-cell-left">
	                    当前选择
	                </view>
	                <view class="uni-list-cell-db">
	                    <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
	                        <view class="uni-input">{{time}}</view>
	                    </picker>
	                </view>
	            </view>
	        </view> -->
		</form>
		</div>
	</view>
</template>

<script>
	import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../api/https.js';
	export default {
		data() {
			return {
				// title: 'picker',
				index: 0,
				// time: '12:01'
				amount:'',
				bankCardNo:'',
				cardList: [],
				
			}
		},
		onShow(){
			this.getBankCard()   //进入该页面即发送请求
		},
		// computed: {
		//     startDate() {
		//         return this.getDate('start');
		//     },
		//     endDate() {
		//         return this.getDate('end');
		//     }
		// },
		methods: {
			submit(){
				https.post('deposits',{
					amount: this.amount,
					bankCardNo: this.bankCardNo
				}).then(res=>{
					console.log(res)
					if(res.statusCode == 200){
						uni.showToast({
							title: '充值申请已提交',
							duration: 2000
						});
					}else {
						uni.showToast({
							icon: 'none',
							title: '提交失败',
							duration: 2000
						});
					}
				})
			},
			bindPickerChange: function(e) {
				console.log(e.target)
				this.index = e.target.value;
				console.log(this.cardList[this.index ]);
				this.bankCardNo = (this.cardList[this.index ] || {}).cardNo;
				// this.$set(this.ruleForm,this.ruleForm.bankCardNo,this.array[this.index])
			
			},
			getBankCard(){
				https.get('bankcard?status=succeeded').then(res=>{
					console.log(res);
					const {data} = res;
					this.cardList = data;
					this.bankCardNo = (data[0] || {}).cardNo;
				});
			
			},
			
			onAmountChange: function(e) {
				
			}
			// bindTimeChange: function(e) {
			//     this.time = e.target.value
			// }
		}
	}
</script>

<style>
	.select {
		padding: 20rpx 0;
		font-size: 14px;
	}

	.disFl {
		display: flex;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
		padding: 15rpx 0;
		margin-top: 15rpx;
	}

	.currentSelect {
		margin: 0 70rpx 0 0;
	}

	/* .title {
		margin-left: 30rpx;
	} */
	
	/* ------- */
	.uni-form-item .title {
		padding: 20rpx 0;
	}
	
	/* .mgtp {
		margin-top: -30rpx;
	} */
	
	.change-btn {
		background-color: #d81e06;
		color: white;
	}
	
	/* .margin10 {
		margin: 20rpx;
		text-align: center;
	} */
	
</style>
