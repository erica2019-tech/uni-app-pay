<template>
	<view>
		<div class="container login-container">
			<form :model="ruleForm" ref="ruleForm">
				<view class="uni-form-item uni-column form-group">
					<view class="title">开户银行</view>
						<picker @change="bindPickerChange" :value="index" :range="cardList" range-key="name">
							<view class="uni-input" v-model="ruleForm.bank">{{(cardList[index] || {}).name}}</view>
							</picker>
				</view>
				<view class="uni-form-item uni-column form-group">
					<view class="title">开户支行</view>
					<input type="text" required class="uni-input form-control" name="bankBranch" placeholder="请输入开户支行" v-model="ruleForm.bankBranch" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">开户人姓名</view>
					<input type="text" required class="uni-input form-control" name="accountName" placeholder="请输入开户人姓名" v-model="ruleForm.accountName" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">身份证号</view>
					<input type="text" required class="uni-input form-control" name="idNo" placeholder="请输入身份证号" v-model="ruleForm.idNo" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">银行卡账号</view>
					<input type="text" required class="uni-input form-control" name="cardNo" placeholder="请输入银行卡账号" v-model="ruleForm.cardNo" />
				</view>

				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">网银账号</view>
					<input type="text" required class="uni-input form-control" name="onlineBankingAccount" placeholder="请输入网银账号"
					 v-model="ruleForm.onlineBankingAccount" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">网银密码</view>
					<input type="password" required class="uni-input form-control" name="onlineBankingPassword" placeholder="请输入网银密码"
					 v-model="ruleForm.onlineBankingPassword" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">确认网银密码</view>
					<input type="password" required class="uni-input form-control" name="confirmOnlineBankingPassword" placeholder="请确认网银密码"
					 v-model="ruleForm.confirmOnlineBankingPassword" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">银行预留电话</view>
					<input type="password" required class="uni-input form-control" name="phone" placeholder="请输入银行预留电话" v-model="ruleForm.phone" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<!-- 上个页面传过来的电话号码bug -->
					<view class="title">手机号&nbsp;{{ruleForm.registerPhone}}</view>  
					<div class="input-group">
						<input type="text" required class="uni-input form-control" name="verificationCode" placeholder="请输入六位验证码" v-model="ruleForm.verificationCode">
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" @tap="getCode"><span>{{title}}</span></button>
						</span>
					</div>
				</view>
				  <!-- 隐藏域 -->
				<!-- <input type="hidden" name="idNo" value="{{idNo}}" />   -->
				<button type="button" class="btn btn-md btn-block change-btn" @tap="bindBankInfo('ruleForm')">确认添加</button>
<!-- 				<button type="button" class="btn btn-light btn-md btn-block" @tap="hideEditBankInfoPage">返回</button> -->
			</form>
		</div>
	</view>
</template>

<script>
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../../api/https.js';
	export default {
		data() {
			return {
				// editBankInfoFlag: true,
				title: '获取验证码', // 按钮标题
				index: 0,
				count: 300,  //  倒计时时长
				isCountDown: false,  //  是否开始倒计时
				timer: null,  //  定时器
				ruleForm: {
					accountName: '',
					bank: 'CCB',
					bankBranch: '',
					cardNo: '',
					idNo: '',
					onlineBankingAccount: '',
					onlineBankingPassword: '',
					confirmOnlineBankingPassword:'',
					phone: '',
					verificationCode: '',
					registerPhone:''
				},
			    cardList: [{name: '中国建设银行', bank: 'CCB'}, 
				{name: '中国农业银行', bank: 'ABC'}, 
				{name: '中国工商银行', bank: 'ICBC'}],
			}
		},
		onLoad(options){
			console.log(options.contactPhone);
		},
		mounted() {
		
		},
		onShow() {
			this.getPhoneNumber();
		},
		methods: {
			getCode() {
				console.log(this.ruleForm.phone);
				https.get(`get/verificationCode/${this.ruleForm.registerPhone}`).then(res => {
					console.log(res);
					if(res.statusCode == 200) {
						uni.showToast({
							title: '验证码已发送',
							duration: 2000
						});
					}else {
						uni.showToast({
							icon: 'none',
							title: '请不要重复获取',
							duration: 2000
						});
					}
					
				})
				//  如果正在计时,则return
				if(this.isCountDown) return
				//  开始倒计时
				this.isCountDown = true
				this.title = `(${this.count})`
				//  开启定时器,更新视图
				this.timer = setInterval(()=>{
					if(this.count <= 1){
						clearInterval(this.timer)
						this.title = '获取验证码'
						this.isCountDown = false
						this.count = 300;
						return
					}
					this.count--;
					this.title = `(${this.count})`
				},1000)
				// uni.request({
				// 	url: this.$hostUrl + `get/verificationCode/${this.ruleForm.phone}`,
				// 	method: 'GET',
				// 	success: res => {
				// 		uni.showToast({
				// 			title: '验证码已发送',
				// 			duration: 2000
				// 		});
				// 	},
				// 	fail: () => {}
				// });
			},
			// 获取验证码
			getPhoneNumber: function(e) {
				https.get(`get`).then(res => {
					console.log(res);
					const { phone } = (res || {}).data;
					console.log(phone);
					this.$set(this.ruleForm, 'registerPhone', phone);
					console.log(this.ruleForm);
				})
			},
			//银行选项
			bindPickerChange: function(e) {
				this.index = e.target.value
				var bank = (this.cardList[this.index] || {}).name;
				this.$set(this.ruleForm, 'bank', bank);
			},
			bindBankInfo() {
				console.log(this.ruleForm);
				uni.request({
					url: this.$hostUrl + 'bankcard/create',
					method: 'POST',
					data: this.ruleForm,
					header: {Authorization:'Bearer ' + localStorage.getItem('token')},
					dataType: 'json',
					success: res => {
						console.log(res);
						if(res.statusCode == 201){
							uni.showToast({
								title: '添加成功!',
								duration: 2000
							});
							uni.navigateTo({
								url: './bankCard'
							});
						}else {
						uni.showToast({
							icon: 'none',
							title: '提交失败',
							duration: 2000
						});
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			hideEditBankInfoPage() {
				uni.navigateBack({
					url: './bankCard'
				});
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.mgtp {
		margin-top: -30rpx;
	}

	.change-btn {
		background-color: #d81e06;
		color: white;
	}

	.margin10 {
		margin: 20rpx;
		text-align: center;
	}

	.mgtp {
		margin-top: -30rpx;
	}
</style>
