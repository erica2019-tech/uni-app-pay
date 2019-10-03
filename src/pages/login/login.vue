<template>
	<view class="content">
		<div class="container login-container">
			<form class="form" :model="ruleForm" ref="ruleForm">
				<view class="uni-form-item uni-column form-group">
					<view class="title">用户名</view>
					<input type="text" required class="uni-input form-control" name="account" placeholder="请输入手机号" v-model="ruleForm.account" />
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">密码</view>
					<input type="password" required class="uni-input form-control" name="password" placeholder="请输入密码" v-model="ruleForm.password" />
				</view>
				<!-- <div class="checkbox remember-password-container">
					<input type="checkbox" v-model="ruleForm.rememberMe" id="remember-password-checkbox" v-on:click="doRememberPassword($event)" />
					<label for="remember-password-checkbox">
						记住密码
					</label>
				</div> -->
				<view class="uni-form-item uni-column form-group">
						<label>
							<checkbox v-model="ruleForm.rememberMe" color="#d81e06" />记住密码
						</label>
				</view>
				<button type="button" class="btn btn-md btn-block login-btn" @tap="login('ruleForm')">立即登录</button>
				<p class="margin10">
					<a @tap="forgotPassword">忘记密码?</a>
				</p>
				<button type="button" class="btn btn-light btn-md btn-block" @tap="goToRegister">注册</button>
			</form>

		</div>
	</view>
</template>

<script>
	import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	export default {
		data() {
			return {
				value:'',
				ruleForm: {
					account: "",
					password: "",
					rememberMe: true
				}
			}
		},
		onLoad() {

		},
		methods: {
			// 登录
			login(ruleForm) {
				let ruleFormJson = JSON.stringify(this.ruleForm);
				console.log(ruleFormJson);
				uni.request({
					url: this.$hostUrl + 'authenticate',
					data: ruleFormJson,
					method: "POST",
					success: res => {
						console.log(res);
						let {data,statusCode} = res
						if(statusCode == 200){
							localStorage.setItem('token', data.idToken)
						}
						uni.switchTab({
							url: '../home/index'
						});
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			//  前往注册页面
			goToRegister() {
				uni.navigateTo({
					url: '../register/register'
				});
			},
			// 忘记密码
			forgotPassword() {
				uni.navigateTo({
					url: '../components/aboutPassword/forgotPassword'
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

	.login-btn {
		background-color: #d81e06;
		color: white;
	}

	.margin10 {
		margin: 20rpx;
		text-align: center;
	}

	.margin10 a {
		color: #000000;
	}
    /* .container {
		padding-right: 2rem;
	} */
	/* .form {
		width: 100%;
	}
	.btn {
		width: 100%;
	} */
	/* .uni-input {
		height: 20rpx;
	} */
</style>
