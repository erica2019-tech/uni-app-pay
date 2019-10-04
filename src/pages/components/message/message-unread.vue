<template>
	<view>
		<view class="example-title">未读信息列表</view>
		<uni-list>
			<view v-for="(item, key) in list" :key="key">
				<uni-list-item :title="item.title" :note="item.createDate" @tap='readMessage(item)'/>
				
			</view>
		</uni-list>

	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import https from '../../../api/https.js';
	export default {
		components: {
			uniList,
			uniListItem,

		},
		data() {
			return {
				list: [],
			}
		},
		onLoad() {

		},
		onShow() {
			this.queryUnread();
		},
		methods: {
			queryUnread: function() {
				https.get(`inform?status=unread`).then(res=> {
					const {data} = res;
					this.list = data;
				})
			},
			readMessage: function(item) {
				const self = this;
				uni.showModal({
				    title: item.title,
				    content: item.content,
					showCancel: false,
				    complete: function (res) {
						self.changeMessageState(item)
				    }
				});
			},
				
			changeMessageState: function(item) {
				https.put(`inform/${item.id}`).then(res=>{
					this.queryUnread();
				})
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx;
		position: relative;
		background-color: #fdfdfd;
		font-weight: 500;
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 0;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 10upx;
		height: 40upx;
		border-top-right-radius: 10upx;
		border-bottom-right-radius: 10upx;
		background-color: #031e3c;
	}

	.example .example-title {
		margin: 40upx 0
	}


</style>