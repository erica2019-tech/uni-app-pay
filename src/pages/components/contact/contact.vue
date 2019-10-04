<template>
	<view class='contact-container'>
		<view class="add-contact">
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
		<scroll-view scroll-y="true" class='contact-table'>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>联系方式</th>
						<th>账号</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(contact, index) in contectList" :key="index">
						<td>
							<span class="badge">{{contact.type}}</span>
						</td>
						<td>
							<div class='contact-code'>{{contact.code}}</div>
						</td>
						<td>
							<div class='btn-container'>
								<button type="default" size="mini" @tap="editContact(contact)">编辑</button>
								<button  class='delete-btn' type="warn" size="mini" @tap="deleteContact(contact.id)">删除</button>
							</div>
							
						</td>
					</tr>
				</tbody>
			</table>
		</scroll-view>
		
	</view>
</template>

<script>
	import https from '../../../api/https.js';
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	export default {
		data() {
			return {
				index: 0,
				contectList: [],
				contectWay: ['qq', 'wechat', 'skype', 'telegram'],
				contactNumber: ''
				
			}
		},
		onShow() {
			this.queryContacts();
			console.log('shidojfoid');
		},
		methods: {
			queryContacts: function () {
				console.log('chaxun');
				https.get('contact/get').then(res => {
					this.contectList = res.data;
					console.log(this.contectList);
				 
				})
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
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
			
			deleteContact: function(id) {
				const self = this;
				uni.showModal({
				    title: '是否确定删除这条联系方式?',
				    success: function (res) {
				        if (res.confirm) {
				           https.deletes(`contact/delete/${id}`).then(res=>{
							   if(res.statusCode == 200) {
								  uni.showToast({
								  	title: '删除成功',
								  	duration: 2000,
								  });
								  self.queryContacts();
							   } else {
								   uni.showToast({
								   	title: '删除失败',
								   	duration: 2000,
								   });
							   }
						   })
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			editContact: function(contact) {
				console.log(contact);
				uni.navigateTo({
					url: `editContact?type=${(contact || {}).type}&code=${(contact || {}).code}&id=${(contact || {}).id}`
				})
			}
		}
	}
</script>

<style>
	.contact-container .delete-btn {
		margin-left: 10px;
	}
	.add-contact-form {
		padding: 10px;
	}
	.add-contact-form .title {
		font-weight: 600;
	}
	.add-contact-form .warn {
		color: rgb(216, 30, 6);
	}
	.uni-list-cell-db {
		margin-top: 10px;
		padding: 6px;
		border-top: 1px solid #ddd;
	    border-bottom: 1px solid #ddd;
	}
	.contact-input {
		margin-top: 10px;
	}
	.add-btn {
		background-color: #d81e06;
		color: white;
		margin-top: 10px;
	}
	.contact-container .table {
		width: 100%;
	}
	.contact-table {
		
		margin-top: 10px;
	}

	.contact-code {
		overflow: hidden;
		text-overflow: ellipsis;  
		width: 20vw;
		
	}
	.btn-container {
		width: 200px;
		text-align: center;
	}
</style>
