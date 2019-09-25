<template>
	<view>
		<div class="container login-container mgtp">
			<form :model="ruleForm">
				<view class="uni-form-item uni-column form-group">
					<view class="title">金主账号</view>
					<input type="text" required class="uni-input form-control" name="account" placeholder="请输入手机号" v-model="ruleForm.account" />
				</view>
				<view class="uni-form-item uni-column form-group">
					<view class="title">联系电话</view>
					<input type="text" required class="uni-input form-control" name="phone" placeholder="请输入实际使用手机号" v-model="ruleForm.phone" />
				</view>
				<view class="uni-form-item uni-column form-group">
					<view class="title">登录密码</view>
					<input type="password" required class="uni-input form-control" name="password" placeholder="请输入登录密码" v-model="ruleForm.password" />
				</view>
				<view class="uni-form-item uni-column form-group">
					<view class="title">确认密码</view>
					<input type="password" required class="uni-input form-control" name="confirmPassword" placeholder="请输入确认密码"
					 v-model="ruleForm.confirmPassword" />
				</view>
				<!--   <view class="uni-form-item uni-column form-group">
		                <view class="title">验证码</view>
		                <input type="text" required class="uni-input form-control" name="verificationCode" placeholder="请输入验证码" v-model="ruleForm.verificationCode" />
		            </view> -->

				<view class="uni-form-item uni-column form-group">
					<view class="title">验证码</view>
					<div class="input-group">
						<input type="text" required class="uni-input form-control" name="verificationCode" placeholder="请输入六位验证码" v-model="ruleForm.verificationCode">
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" @tap="getCode"><span>{{title}}</span></button>
						</span>
					</div>
				</view>

				<view class="uni-form-item uni-column form-group">
					<view class="title">邀请码</view>
					<input type="text" required class="uni-input form-control" name="invitationCode" placeholder="请输入邀请码" v-model="ruleForm.invitationCode" />
				</view>

				<button type="button" class="btn btn-md btn-block register-btn" @tap="registerLogin('ruleForm')">注册并前往登录</button>

			</form>
		</div>
	</view>
</template>

<script>
	import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	export default {
		data() {
			return {
				title: '获取验证码', // 按钮标题
				count: 300,  //  倒计时时长
				isCountDown: false,  //  是否开始倒计时
				timer: null,  //  定时器
				ruleForm: {
					account: '',
					phone: '',
					password: '',
					confirmPassword: '',
					verificationCode: '',
					invitationCode: ''
				}
			}
		},
		methods: {
			registerLogin(ruleForm) {
				// console.log(this.ruleForm.phone);
				let ruleFormJson = JSON.stringify(this.ruleForm)
				// console.log(ruleFormJson);
				uni.request({
					url: this.$hostUrl + 'create',
					method: 'POST',
					data: ruleFormJson,
					success: res => {
						console.log(res);
						if(res.statusCode == 201){
							// uni.showToast({
							// 	title: '注册成功',
							// 	duration: 2000
							// });
							console.log('注册成功!');
							uni.navigateTo({
								url: '../login/login'
							});
						}else {
							console.log('注册失败!');
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
			getCode() {
				// let {phone} = this.ruleForm
				// console.log(this.ruleForm.phone) 
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
				this.isCountDown = true,
				this.title = `(${this.count})`
				//  开启定时器
				this.timer = setInterval(()=>{
					 if(this.count <= 1){
						 clearInterval(this.timer)
						 this.title = '获取验证码';
						 this.isCountDown = false;
						 this.count = 300;
						 return
					 }
					 this.count--;
					 this.title = `(${this.count})`
				},1000)
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.register-btn {
		background-color: #d81e06;
		color: white;
	}

	/* .mgtp {
		margin-top: 30rpx;
	} */
</style>
