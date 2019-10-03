<template>
	<view>
		<div class="container edit-bankcard">
			<form class="bankcard-form">
				<view class="uni-form-item uni-column form-group">
					<span class="title">开户银行 </span>
					<span class=''>{{bankCode}}</span>
				</view>
				<view class="uni-form-item uni-column form-group">
					<span class="title">开户支行</span>
					<span class=''>{{bankBranch}}</span>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<span class="title">开户人姓名</span>
					<span>{{accountName}}</span>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<span class="title">身份证号</span>
					<span>{{idNo}}</span>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<span class="title">银行卡账号</span>
					<span>{{cardNo}}</span>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<span class="title">创建时间</span>
					<span>{{cardNo}}</span>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">网银账号</view>
					<input type="text" required class="uni-input form-control" name="onlineBankingAccount" placeholder="请输入网银账号"
					 v-model="onlineBankingAccount" :value='onlineBankingAccount'/>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<view class="title">网银密码</view>
					<input type="text" required class="uni-input form-control" name="onlineBankingPassword" placeholder="请输入网银账号"
					 v-model="onlineBankingPassword" :value='onlineBankingPassword'/>

				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<span class="title">银行预留电话</span>
					<span>{{phone}}</span>
				</view>
				<view class="uni-form-item uni-column form-group mgtp">
					<span class="title">备注</span>
					<span>{{remarks}}</span>
				</view>
				  <!-- 隐藏域 -->
				<!-- <input type="hidden" name="idNo" :value="{{idNo}}" />   -->
				<button type="button" class="btn btn-md btn-block change-btn" @tap="editCard">确认编辑</button>
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
				accountName: '',
				bankCode: '',
				bankBranch: '',
				cardID: 0,
				cardNo: '',
				onlineBankingAccount: '',
				onlineBankingPassword: '',
				phone: '',
				remarks: '',
				status: '',
				idNo: '',
				limitTotalAmount: '',
				statusMap: {
					confirm: '审核确认',
					succeeded: '审核通过',
					failed: 'failed'
				}
				
			}
		},
		onLoad(options){
			this.cardID = options.$id;
			this.queryCardDetail(options.$id)
		},
		mounted() {
		
		},
		onShow() {
			
		},
		methods: {
			queryCardDetail: function(id) {
				https.get(`bankcard/getOne/${id}`).then( res => {
					console.log(res);
					const {data} = res;
					this.accountName = (data || {}).accountName;
					this.bankCode = (data || {}).bankCode;
					this.bankBranch = (data || {}).bankBranch;
					this.cardNo = (data || {}).cardNo;
					this.createDate = (data || {}).createDate;
					this.onlineBankingAccount = (data || {}).onlineBankingAccount;
					this.onlineBankingPassword = (data || {}).onlineBankingPassword;
					this.phone = (data || {}).phone;
					this.remarks = (data || {}).remarks;
					this.status = (data || {}).status;
					this.limitTotalAmount = (data || {}).limitTotalAmount;
					this.idNo = (data || {}).idNo;
				})
			},

			editCard: function() {
				https.put(`bankcard/${this.cardID}`, {
					id: this.cardID,
					onlineBankingAccount: this.onlineBankingAccount,
					onlineBankingPassword: this.onlineBankingPassword	
				}).then(res => {
					console.log(res);
					if(res.statusCode == 200) {
						uni.showToast({
							title: '修改成功',
							duration: 2000
						});
					} else {
						const {errMsg} = res;
						uni.showToast({
							title: errMsg,
							duration: 2000,
							icon: "none",
						});
					}
				})
			}
		}
	}
</script>

<style>
	.edit-bankcard .bankcard-form {
		padding: 10px;
	}
	.change-btn {
		background-color: #d81e06;
		color: white;
	}
	.edit-bankcard .uni-form-item .title {
		margin-right: 10px;
	}
</style>
