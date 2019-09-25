<template>
	<view>
		<div class="container login-container">
			<form :model="ruleForm" ref="ruleForm">
				<view class="uni-form-item uni-column form-group">
					<view class="title">旧的登录密码</view>
					<input type="password" required class="uni-input form-control" name="oldPassword" placeholder="请输入旧登录密码" v-model="ruleForm.oldPassword" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">新的登录密码</view>
					<input type="password" required class="uni-input form-control" name="newPassword" placeholder="请输入新登录密码" v-model="ruleForm.newPassword" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">确认登录密码</view>
					<input type="password" required class="uni-input form-control" name="confirmNewPassword" placeholder="请确认新登录密码"
					 v-model="ruleForm.confirmNewPassword" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">联系电话</view>
					<input type="text" required class="uni-input form-control" name="phone" placeholder="请输入实际使用手机号" v-model="ruleForm.phone" />
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
				<button type="button" class="btn btn-md btn-block change-btn" @tap="modifyLoginPwd('ruleForm')">确认修改</button>
				<button type="button" class="btn btn-light btn-md btn-block" @tap="hideModifyLoginPwdPage">返回</button>
			</form>
		</div>
	</view>
</template>

<script>
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	export default {
		data() {
			return {
				title: '获取验证码',  //  按钮提示
				count: 300,   //  倒计时时长
				isCountDown: false,  // 是否倒计时
				timer: null,  //  定时器
				ruleForm: {
					oldPassword: '',
					newPassword: '',
					confirmNewPassword: '',
					phone: '',
					verificationCode: ''
				}
			}
		},
		methods: {
			getCode() {
				let {phone} = this.ruleForm
				uni.request({
					url: this.$hostUrl + `get/verificationCode/${phone}`,
					method: 'GET',
					success: res => {
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
						
					},
					fail: () => {}
				});
				//  如果正在计时,则return
				  if(this.isCountDown) return
				//  开始计时
				   this.title = `(${this.count})`
				   this.isCountDown = true
				//  开启定时器
				    this.timer = setInterval(()=>{
						if(this.count <= 1){
							clearInterval(this.timer)
							this.title = '获取验证码'
							this.isCountDown = false
							this.count = 300
							return
						}
						this.count--
						this.title = `(${this.count})`
					},1000)
			},
			//  修改密码 
			modifyLoginPwd() {
				let ruleFormJson = JSON.stringify(this.ruleForm)
				let token = localStorage.getItem('token')
				uni.request({
					url: this.$hostUrl + 'update/password',
					method: 'PUT',
					header: {Authorization:'Bearer ' + token},
					data: ruleFormJson,
					success: res => {
						if(res.statusCode == 200){
							uni.showToast({
								title: '修改成功',
								duration: 2000
							});
							uni.navigateTo({
								url: '../../login/login'
							});
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							duration: 3000,
							title: `${err.message}`
						});
					}
				});
			},
			hideModifyLoginPwdPage() {
				uni.navigateBack({
					url: '../personalInfo/personalInfo'
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
