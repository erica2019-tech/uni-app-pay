<template>
	<view>
		<div class="personal-info-form">
			
			<div class="row">
				<div class="col-sm-9 offset-sm-3 personal-info-form-item">
					<label>用户名</label> <span>{{userName}}</span>
					<!-- <input type="text" value="123456789" /> -->
				</div>
			</div>
			<div class="row">
				<div class="col-sm-9 offset-sm-3 personal-info-form-item">
					<label>登录密码</label> <span class="personal-info-form-item-action" @tap="showModifyLoginPwdPage"><span>点击修改登录密码</span><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></span>
				</div>
			</div>
			<div class="row">
				<!-- <div class="col-sm-9 offset-sm-3 personal-info-form-item"> -->
					<!-- <label>用户名</label> <span>{{userName}}</span> -->
					 <view class="uni-padding-wrap">
					        <view class="uni-title">联系方式：</view>
					  </view>
					        <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					            <picker-view-column>
					                <view class="item" v-for="(item,index) in contact" :key="index">{{item}}</view>
					            </picker-view-column>
					        </picker-view>
							
				<!-- </div> -->
			</div>
		</div>
	</view>
</template>

<script>
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	export default {
		data(){
			const contact = ['QQ','微信','telegram']
			const contactItem = ''
			for(let i = 0;i<= contact.length-1;i++ ){
				console.log(contact[i])
				// contactItem = contact[i]
			}
			return {
				userName: '123',
				// index: 0,
				visible: true,
				contact,
				contactItem,
				// contact: ['QQ','微信','telegram'],
				value: [],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
				
			}
		},
		methods: {
			 bindChange: function (e) {
			            const val = e.detail.value
			        },
			showModifyLoginPwdPage(){
				uni.navigateTo({
					url: '../aboutPassword/changePassword'
				});
			}
		}
	}
</script>

<style>
	.personal-info-form {
		padding-left: 2rem;
		padding-top: 2rem;
	}
	
	.personal-info-form .row {
		padding-bottom: 1rem;
	}
	
	.personal-info-form-item {
		border-bottom: .01563rem solid #f2f2f2;
		height: 2rem;
	}
	
	.personal-info-form-item label {
		text-align: end;
		width: 6rem;
		margin-right: 1rem;
	}
	
	.personal-info-form-item span {
		color: #9e9e9e;
	}
	.glyphicon {
		margin-left: 0.5rem;
	}
</style>
