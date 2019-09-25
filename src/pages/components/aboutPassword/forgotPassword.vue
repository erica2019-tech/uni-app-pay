<template>
	<view>
		<div class="container login-container">
			<form :model="ruleForm" ref="ruleForm">
				<view class="uni-form-item uni-column form-group">
					<view class="title">账户名</view>
					<input type="text" required class="uni-input form-control" name="account" placeholder="请输入账户名" v-model="ruleForm.account" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">新的密码</view>
					<input type="password" required class="uni-input form-control" name="password" placeholder="请输入新的密码" v-model="ruleForm.password" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">注册电话</view>
					<input type="text" required class="uni-input form-control" name="phone" placeholder="请确认注册电话"
					 v-model="ruleForm.phone" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">验证码</view>
					<div class="input-group">
						<input type="text" required class="uni-input form-control" name="verificationCode" placeholder="请输入六位验证码" v-model="ruleForm.verificationCode">
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" @tap="getCode"><span>{{title}}</span></button>
						</span>
					</div>
				</view>
				<button type="button" class="btn btn-md btn-block change-btn" @tap="modifyLoginPwd('ruleForm')">提交申请</button>
				<button type="button" class="btn btn-light btn-md btn-block" @tap="hideModifyLoginPwdPage">返回</button>
			</form>
		</div>
	</view>
</template>

<script>
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../../api/https.js';
	export default {
		data(){
			return {
				title: '获取验证码',  //  按钮标题
				count: 300,   //  倒计时时长
				isCountDown: false,  //  是否开始倒计时
				timer: null,  //  定时器
				ruleForm: {
					account:'',
					password:'',
					phone:'',
					verificationCode:''
				}
			}
		},
		methods: {
			getCode(){
				// https.get(`get/verificationCode/${this.ruleForm.phone}`).then(res=>{
				// 	console.log(res);
				// })
				uni.request({
					url: this.$hostUrl + `get/verificationCode/${this.ruleForm.phone}`,
					method: 'GET',
					success: res => {
						if(res.statusCode == 200){
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
					
					},
					fail: () => {}
				});
				//  如果正在计时,则return
				if(this.isCountDown) return
				//  开始倒计时
				this.title = `(${this.count})`
				this.isCountDown = true
				//  开启定时器
				this.timer = setInterval(()=>{
					if(this.count <= 1){
						clearInterval(this.timer)
						this.title = '获取验证码'
						this.isCountDown = false
						count = 300
						return
					}
					this.count--
					this.title = `(${this.count})`
				},1000)
			},
			modifyLoginPwd(){
				https.post('forget/password',this.ruleForm).then(res=>{
					console.log(res)
					if(res.statusCode == 200){
						uni.showToast({
							title: '密码修改成功',
							duration: 2000
						});
						uni.navigateTo({
							url: '../../login/login'
						});
					}else {
						uni.showToast({
							title: '密码修改失败',
							duration: 2000
						});
					}
				})
			},
			hideModifyLoginPwdPage(){
				uni.navigateTo({
					url: '../../login/login'
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