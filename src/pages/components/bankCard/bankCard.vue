<template>
	<view>
		<div>
			<ul class="list-group" v-if="BindCardStatus == 400?false:true">
				<li class="list-group-item" v-for="(item,index) in cardList" :key="index">
					<div class="panel panel-danger">
					  <div class="panel-body disFl">
					   <text class="txlf">{{item.accountName}}</text>  
						<text class="txrg">{{status[item.status]}}</text> 
					  </div>
					  <div class="panel-footer  switch-panel-footer">
						<span>{{item.bankCode}}</span>
						<span>{{item.cardNo}}</span> 
					  </div>
					  <div class='btn-container'>
						<button  class='bank-btn' type="default" size="mini" @tap="editCard(item.id)">编辑</button>
						<button  class='bank-btn' type="warn" size="mini" @tap="deleteCard(item.id)">删除</button>
					  </div>
					</div>
				</li>
			</ul>
			<div>
				  <!-- 页面传值bug -->
				 <navigator url="addCard?contactPhone=contactPhone" hover-class="navigator-hover">
				<button class="btn" plain type="default" @tap="addCard">
					<span>
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span>添加银行卡</span>
					</span>
					<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				</button>
				  </navigator>
			</div>
			<!-- <p><a @tap="addCard">添加银行卡</a></p> -->
		</div>
		<!-- 弹出层 -->
		<!-- <view class="dialog" title="修改银行卡" :visible.sync="dialogFormVisible">
           	  <form :model="editForm">
           		 <view class="uni-form-item uni-column">
           		   <view class="title">input</view>
           		   <input class="uni-input" name="input" placeholder="这是一个输入框" />
                 </view>
           	  </form>
			  <view class="dialogFooter">
				  <button  @click="dialogFormVisible = false">取 消</button >
				  <button  type="primary" @click="dialogFormVisible = false">确 定</button >
			  </view>
			  
           </view> -->
	</view>
</template>
<script>
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../../api/https.js';
	export default {
		data() {
			return {
				cardList: [],
				status: {
					confirm: '审核确认',
					succeeded: '审核通过',
					failed: '审核未通过',
				},
				dialogFormVisible: false,
				editForm: {
					id: '',
					onlineBankingAccount: '',
					onlineBankingPassword: ''
				},
				BindCardStatus: null,
				contactPhone: ''
			}
		},
		onLoad(option) {
			this.getBankCard();
		},
		mounted(option) {
			// console.log(option);
		},
		methods: {
			getBankCard(){
				https.get('bankcard?status').then(res=>{
					console.log(res);
					const {data} = res;
					this.cardList = data || [];
				})
			
			},
			editCard(id) {
				uni.navigateTo({
					url: `editCard?$id=${id}`
				});
			},
			changeCard(id) {
				uni.request({
					url: this.$hostUrl + `bankcard/${this.cardList[0].id}`,
					method: 'PUT',
					data: this.editForm,
					header: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					},
					dataType: 'json',
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			deleteCard(id) {
				uni.showModal({
					content: '确认删除吗?',
					success: function(res) {
						if (res.confirm) {
							https.deletes(`bankcard/${id}`).then(res => {
								if(res.statusCode == 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									this.getBankCard();
								}
							})
						}
					},
				})
			},
			addCard() {
				https.get('get').then(res => {
					console.log(res.data.phone);
				    this.contactPhone = res.data.phone
				})
				// uni.navigateTo({
				// 	url: `./addCard`
				// });
			}
		}

	}
</script>

<style>
	.btn {
		display: flex;
		justify-content: space-between;
		color: #8C8C8C;
	}

	.glyphicon-plus {
		margin-right: 0.5rem;
	}
    
	.panel-body .txlf {
		float: left;
	}
	
	.panel-body .txrg {
		float: right;
	}
   .disFl {
		overflow: hidden;
	}
    .switch-panel-footer {
		display: flex;
		justify-content: space-between;
	}
	.panel-footer {
		
	}
	.btn-container {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		
	}
</style>
