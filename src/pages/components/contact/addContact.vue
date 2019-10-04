<template>
		<view  class="add-contact-container">
			<form>
				<view class="uni-form-item uni-column add-contact-form">
					<view class="title">请选择联系方式 
					</view>
					<div class='warn'>请勿重复添加相同联系方式</div>	
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="contectWay">
							<view class="uni-input">{{contectWay[index]}}</view>
						</picker>
					</view>
					<view class="contact-input">
						<input type="text" required class="uni-input form-control" name="idNo" placeholder="请输入联系方式" v-model="contactNumber" />
					</view>
					<button type="button" class="btn btn-md btn-block add-btn" @tap="addContact">确认添加</button>
				</view>	
			</form>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				contectList: [],
				contectWay: ['qq', 'wechat', 'skype', 'telegram'],
			    contactNumber: ''
			}
		},
		methods: {
			addContact: function(e) {
				if(this.contactNumber == '') {
					uni.showToast({
						title: '请输入联系方式',
						duration: 2000,
						icon: 'none'
					});
				} else {
				https.post('contact/create', {
					  "code": this.contactNumber,
					  "type": this.contectWay[this.index],
					}).then(res => {
						if(res.statusCode == 400) {
							const {data} = res;
							uni.showToast({
								title: data.title,
								duration: 2000,
								icon: 'none'
							});
						} else {
							this.queryContacts();
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
