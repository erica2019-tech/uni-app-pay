<template>
		<view  class="add-contact-container">
			<form>
				<view class="uni-form-item uni-column add-contact-form">
					<view class="title"> 编辑联系方式 
					</view>
					<view class="uni-list-cell-db">
						{{type}}
					</view>
					<view class="contact-input">
						<input type="text" required class="uni-input form-control" name="idNo" placeholder="请输入联系方式" v-model="code" />
					</view>
					<button type="button" class="btn btn-md btn-block add-btn" @tap="editContact">确认修改</button>
				</view>	
			</form>
		</view>
</template>

<script>
	import https from '../../../api/https.js';
	export default {
		data() {
			return {
				type: ',',
				code: '',
				id: 0,
				oldCode: '',
			}
		},
		onLoad:function(options) {
			console.log(options);
			const {type, code, id} = options;
			this.type = type;
			this.code = code;
			this.id = id;
			this.oldCode = code; // 初始值
		},
		onBackPress:function() {
			console.log('返回联系方式');
			uni.navigateBack({
				delta: 1
			});
		},
		methods: {
			editContact: function(e) {
				if(this.code == '') {
					uni.showToast({
						title: '请输入联系方式',
						duration: 2000,
						icon: 'none'
					});
				} else if (this.code == this.oldCode) {
					uni.showToast({
						title: '请修改联系方式',
						duration: 2000,
						icon: 'none'
					});
				} else {
					console.log(this.id);
				https.put(`contact/update/${this.id}`, {
					  "code": this.code,
					  "type": this.type,
					}).then(res => {
						console.log(res);
						if(res.statusCode == 200) {
							uni.showToast({
								title: '修改成功',
								duration: 2000,
							});
						} else {
							const {errMsg} = res;
							uni.showToast({
								title: errMsg,
								duration: 2000,
								icon: 'none'
							});
						}
					})
				}
			},
		}
	}
</script>

<style>
	.add-contact-form {
		padding: 10px;
		font-size: 16px;
	}
	.add-contact-form .title {
		font-weight: 600;
	}
	.add-contact-form .warn {
		color: rgb(216, 30, 6);
	}
	.uni-list-cell-db {
		margin-top: 20px;
		padding: 6px;
		border-top: 1px solid #ddd;
	    border-bottom: 1px solid #ddd;
	}
	.contact-input {
		margin-top: 20px;
	}
	.add-btn {
		background-color: #d81e06;
		color: white;
		margin-top: 20px;
	}
</style>
