<template>
	<view>
		<view>
		  <ul class="nav nav-tabs nav-justified disFl">
		  <li role="presentation" :class="[showThreeDays ? 'active': '']" @tap="searchThreeDaysDetail"><a href="#">三日订单明细</a></li>
		  <li role="presentation" :class="[!showThreeDays ? 'active': '']" @tap="searchDepositsDetail"><a href="#">用户充值明细</a></li>
		  </ul>
		</view>
	
		<view v-if='showThreeDays'>
			<div  class="card-body">
				<table class="table table-sm bounty-ranking-table">
					<thead>
						<tr>
							<th>单号</th>
							<th>金额</th>
							<th>收入</th>
							<th>日期</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list,index) in orderList" :key="index">
							<td>{{list.no}}</td>
							<td>￥{{list.orderAmount}}</td>
						    <td>{{list.income}}</td>
							<td><span class='overflow'>{{list.transactionDate}}</span></td>
						</tr>
					</tbody>
				</table>
			</div>	
		</view>
		<view v-if='!showThreeDays'>
			<div  class="card-body">
				<table class="table table-sm bounty-ranking-table">
					<thead>
						<tr>
							<th>单号</th>
							<th>金额</th>
							<th>状态</th>
							<th>日期</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list,index) in orderList" :key="index">
							<td>{{list.no}}</td>
							<td>￥{{list.amount}}</td>
						    <td>{{list.status}}</td>
							<td><span class='overflow'>{{list.createDate}}</span></td>
						</tr>
					</tbody>
				</table>
			</div>	
		</view>
	</view>
</template>

<script>
	import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../../api/https.js'
	export default {
		data() {
			return {
				showThreeDays: true,
				page: 0,
				scalperId: 0,
				size: 20,
				orderList: [],
			}
			
		},
		onLoad() {
			this.searchThreeDaysDetail();
		},
		methods: {
			// 获取三日订单明细
			searchThreeDaysDetail: function(e) {
				this.showThreeDays = true;
				https.get(`get`).then(res => {
					console.log('sanridingdan');
					console.log(res);
					const { id } = (res || {}).data;
					this.scalperId = id;
					return res;
				}).then( res=> {
					if(res.statusCode == 200) {
			https.get(`statistical/threeDaysOrdersDetail?scalperId=${this.scalperId}&page=${this.page}&size=${this.size}`).then(res => {
				console.log(res);
				this.orderList = (res || {}).data;
				})
					}
				})
			},
			
			// 获取充值明细
			searchDepositsDetail: function(e) {
			   this.showThreeDays = false;
				https.get(`get`).then(res => {
					console.log(res);
					const { id } = (res || {}).data;
					this.scalperId = id;
					return res;
				}).then( res=> {
					if(res.statusCode == 200) {
						https.get(`deposits?scalperId=${this.scalperId}&page=${this.page}&size=${this.size}`).then(res => {
						this.orderList = (res || {}).data;
						console.log(this.orderList);
				})
					}
				})
			},
	}
		
		
	}
</script>

<style>
	.disFl {
		display: flex;
	}
	.overflow {
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换行
	}
</style>