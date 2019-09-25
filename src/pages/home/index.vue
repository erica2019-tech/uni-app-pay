<template>
	<view>

		<div id="index" v-cloak>
			<div class="page-body">
				<div class="card" v-show="isLoggedInFlag && showTodayReceiveOrderSituationFlag">
					<div class="card-header">
						<span>今日接单情况</span><span class="float-right" style="color: #dc3545; font-weight: bold;" @tap="showTotalReceiveOrderSituation">今日接单情况&gt;</span>
					</div>
					<div class="card-body">
						<div class="row gathering-item">
							<div class="col-sm-8 offset-sm-4">
								<label>今日收款金额</label> <span>{{todayReceiveOrderSituation != null ? todayReceiveOrderSituation.paidAmount : 0}}元</span>
							</div>
						</div>
						<div class="row gathering-item">
							<div class="col-sm-8 offset-sm-4">
								<label>今日收款笔数</label> <span>{{todayReceiveOrderSituation != null ? todayReceiveOrderSituation.paidOrderNum : 0}}笔</span>
							</div>
						</div>
						<div class="row gathering-item">
							<div class="col-sm-8 offset-sm-4">
								<label>今日奖励金</label> <span>{{todayReceiveOrderSituation != null ? todayReceiveOrderSituation.bounty : 0}}元</span>
							</div>
						</div>
						<!-- <div class="row gathering-item" v-show="accountType == 'agent'">
							<div class="col-sm-8 offset-sm-4">
								<label>代理佣金</label> <span>{{todayReceiveOrderSituation != null ? todayReceiveOrderSituation.rebateAmount : 0}}元</span>
							</div>
						</div> -->
					</div>
				</div>
				<div class="card" v-show="isLoggedInFlag && !showTodayReceiveOrderSituationFlag">
					<div class="card-header">
						<span>累计接单情况</span><span class="float-right" style="color: #dc3545; font-weight: bold;" @tap="showTodayReceiveOrderSituation">累计接单情况&gt;</span>
					</div>
					<div class="card-body">
						<div class="row gathering-item">
							<div class="col-sm-8 offset-sm-4">
								<label>累计收款金额</label> <span>{{totalReceiveOrderSituation != null ? totalReceiveOrderSituation.paidAmount : 0}}元</span>
							</div>
						</div>
						<div class="row gathering-item">
							<div class="col-sm-8 offset-sm-4">
								<label>累计收款笔数</label> <span>{{totalReceiveOrderSituation != null ? totalReceiveOrderSituation.paidOrderNum : 0}}笔</span>
							</div>
						</div>
						<div class="row gathering-item">
							<div class="col-sm-8 offset-sm-4">
								<label>累计奖励金</label> <span>{{totalReceiveOrderSituation != null ? totalReceiveOrderSituation.bounty : 0}}元</span>
							</div>
						</div>
						<!-- <div class="row gathering-item" v-show="accountType == 'agent'">
							<div class="col-sm-8 offset-sm-4">
								<label>代理佣金</label> <span>{{totalReceiveOrderSituation != null ? totalReceiveOrderSituation.rebateAmount : 0}}元</span>
							</div>
						</div> -->
					</div>
				</div>
				<div class="card" v-show="showTodayBountyRankFlag">
					<div class="card-header">
						<span>今日奖励金排行榜</span><span class="float-right" style="color: #dc3545; font-weight: bold;" @tap="showTotalTop10BountyRank">今日排行榜&gt;</span>
					</div>
					<div class="card-body">
						<table class="table table-sm bounty-ranking-table">
							<thead>
								<tr class="disFl">
									<th>排行</th>
									<th>账号</th>
									<th>奖励金</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(bountyRank,index) in todayBountyRanks" :key="index">
									<td><span class="badge" v-bind:class="[index > 2 ? 'badge-success' : 'badge-danger']">{{bountyRank.scalperId}}</span></td>
									<td>{{bountyRank.account}}</td>
									<td>￥{{bountyRank.earnings}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="card" v-show="!showTodayBountyRankFlag">
					<div class="card-header">
						<span>累计奖励金排行榜</span><span class="float-right" style="color: #dc3545; font-weight: bold;" @tap="showTodayTop10BountyRank">累计排行榜&gt;</span>
					</div>
					<div class="card-body">
						<table class="table table-sm bounty-ranking-table">
							<thead>
								<tr>
									<th>排行</th>
									<th>账号</th>
									<th>奖励金</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(bountyRank,index) in totalBountyRanks" :key="index">
									<td><span class="badge" v-bind:class="[index > 2 ? 'badge-success' : 'badge-danger']">{{bountyRank.scalperId}}</span></td>
									<td>{{bountyRank}}</td>
									<td>￥{{bountyRank.earnings}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

	</view>
	</view>
</template>

<script>
	import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
	import https from '../../api/https.js';
	export default {
		data() {
			return {
				scalperId: 1,
				isLoggedInFlag: true,
				// accountType: '',
				showTodayReceiveOrderSituationFlag: true,
				todayReceiveOrderSituation: {},
				totalReceiveOrderSituation: {},
				showTodayBountyRankFlag: true,
				todayBountyRanks: [],
				totalBountyRanks: []
			}
		},
		onLoad: function() {
			//  默认加载今日接单情况
			this.loadTodayReceiveOrderSituation();
			//  默认加载今日排行榜
			this.loadTodayTop10BountyRank();
		},
		mounted() {
			// let inviteCode = option['inviteCode'];
			// if (inviteCode != null) {
			// 	window.sessionStorage.setItem('inviteCode', inviteCode);
			// }
			// this.loadSystemSetting();
			// this.getUserAccountInfo();
			// this.loadTodayTop10BountyRank();
			//  默认加载今日接单情况
			// this.loadTodayReceiveOrderSituation();
			//  默认加载今日排行榜
			// this.loadTodayTop10BountyRank();
		},
		methods: {
			// loadSystemSetting() {
			// 	uni.request({
			// 		url: '',
			// 		method: 'GET',
			// 		data: {},
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },
			//  加载今日接单情况
			loadTodayReceiveOrderSituation() {
				https.get(`statistical/todayReceiveOrders?scalperId=${this.scalperId}`).then(res => {
					// console.log(res);
				})
			},
			//  加载今日排行榜
			loadTodayTop10BountyRank() {
				https.get('statistical/top').then(res => {
					console.log(res.data[0]);
					const {
						statusCode,
						data
					} = res
					if (statusCode == 200) {
						this.todayBountyRanks = data
					}

				})
			},
			// 显示今日排行榜
			showTodayTop10BountyRank: function() {
				this.showTodayBountyRankFlag = true;
				this.loadTodayTop10BountyRank();
			},
			//  显示累计排行榜
			showTotalTop10BountyRank: function() {
				this.showTodayBountyRankFlag = false;
				this.loadTotalTop10BountyRank();
			},
			// 显示今日接单情况
			showTodayReceiveOrderSituation: function() {
				this.showTodayReceiveOrderSituationFlag = true;
				this.loadTodayReceiveOrderSituation();
			},
			// 显示累计接单情况
			showTotalReceiveOrderSituation: function() {
				this.showTodayReceiveOrderSituationFlag = false;
				this.loadTotalReceiveOrderSituation();
			},
			//  加载累计接单情况
			loadTotalReceiveOrderSituation() {
				uni.request({
					url: '',
					method: 'GET',
					data: {},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			//  加载累计排行榜
			loadTotalTop10BountyRank() {
				uni.request({
					url: '',
					method: 'GET',
					data: {},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// getUserAccountInfo() {
			// 	uni.request({
			// 		url: '',
			// 		method: 'GET',
			// 		data: {},
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// }
		}
	}
</script>

<style>
	.gathering-item {}

	.gathering-item label {
		text-align: end;
		width: 8rem;
		margin-right: 2rem;
		color: #495057;
		font-weight: bold;
	}

	.gathering-item span {
		color: #0062cc;
		font-weight: bold;
	}

	.bounty-ranking-table {}

	.bounty-ranking-table th,
	.bounty-ranking-table td {
		width: 33%;
	}

	.bounty-ranking-table tr,
	.bounty-ranking-table td {
		text-align: start;
	}

	.bounty-ranking-table td {
		padding-left: 0.5rem;
	}

	.float-right {
		float: right;
	}

	.card-header {
		padding: 20rpx;
	}

	.taCen {
		text-align: center !important;
	}
</style>
