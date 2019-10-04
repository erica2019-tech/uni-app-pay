<template>
	<view>
<!-- 		<view class="example-title">站内信列表</view> -->
		<uni-list>
			<uni-list-item title="已读信息" @tap='gotoMessageRead'/>
			<uni-list-item :show-badge="true" title="未读信息" :badge-text="unReadCount"  @tap="gotoMessageUnRead"/>
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
				unReadCount: '0',
			}
		},
		onShow() {
			https.get('inform/unread/count ').then(res=>{
				console.log(res);
				const {data} = res;
				this.unReadCount = data + ''
			})
		},
		methods: {
			gotoMessageRead(e) {
				uni.navigateTo({
					url: 'message-read',
				})
			},
			gotoMessageUnRead(e) {
				uni.navigateTo({
					url: 'message-unread',
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
		background-color: #fdfdfd
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
		background-color: #031e3c
	}

	.example .example-title {
		margin: 40upx 0
	}


</style>