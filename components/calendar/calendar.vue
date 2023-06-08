<template>
	<view class="calendar-wrapper">
		<slot name="header"></slot>
		<view class="header">
			<view>{{markDays}}</view>
		</view>
		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{item}}</view>
		</view>
		<view class="content">
			<view class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" :class="{
							nolm: !item.isCurM}">
						{{Number(item.date)}}
					</view>
					<view v-if="isMarkDay(item.year, item.month, item.date) && item.isCurM" class=" markDayBg centerBar animate__animated  animate__pulse  animate__infinite infinite ">
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'calendar',
		props: {
			// 星期几为第一天(0为星期日)
			weekstart: {
				type: Number,
				default: 0
			},
			// 标记的日期
			markDays: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				weektext: ['日', '一', '二', '三', '四', '五', '六'],
				// y: new Date().getFullYear(), // 年
				// m: new Date().getMonth() + 1, // 月
				y: null,
				m: null,
				dates: [], // 当前月的日期数据
			}
		},
		created() {
			this.y = this.markDays.split('-')[0]
			this.m = this.markDays.split('-')[1]
			this.dates = this.monthDay(this.y, this.m)
		},
		computed: {
			// 顶部星期栏
			weekDay() {
				return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart))
			},
		},
		methods: {
			formatNum(num) {
				let res = Number(num)
				return res < 10 ? '0' + res : res
			},
			getToday() {
				let date = new Date()
				let y = date.getFullYear()
				let m = date.getMonth()
				let d = date.getDate()
				let week = new Date().getDay()
				let weekText = ['日', '一', '二', '三', '四', '五', '六']
				let formatWeek = '星期' + weekText[week]
				let today = {
					date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),
					week: formatWeek
				}
				return today
			},
			// 获取当前月份数据
			monthDay(y, month) {
				let dates = []
				let m = Number(month)
				let firstDayOfMonth = new Date(y, m - 1, 1).getDay() // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m, 0).getDate() // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate() // 上一月的最后一天
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart
					} else {
						return 7 - weekstart + firstDayOfMonth
					}
				})()
				let endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: this.formatNum(lastDayOfLastMonth - startDay + i),
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
						year: m - 1 >= 0 ? y : y - 1
					})
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: this.formatNum(j),
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: this.formatNum(m),
						year: y,
						isCurM: true //是否当前月份
					})
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: this.formatNum(k),
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
						year: m + 1 <= 11 ? y : y + 1
					})
				}
				return dates
			},
			// 标记日期
			isMarkDay(y, m, d) {
				let flag = false
				let dy = `${y}-${m}-${d}`
				if (this.markDays == dy) {
					flag = true
				}
				return flag
			},
		}
	}
</script>

<style lang="scss" scoped>
	.calendar-wrapper {
		font-size: 28rpx;
		text-align: center;
		background-color: #fff;
		padding-bottom: 10rpx;
		box-shadow: 0px 3px 8px rgba(36, 36, 36, 0.16);
		border-radius: 8px;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			color: #42464a;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 2rpx solid #f2f2f2;

			.pre,
			.next {
				color: #4d7df9;
				font-size: 28rpx;
				font-weight: normal;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;
				border: 2rpx solid #dcdfe6;
			}

			.pre {
				margin-right: 30rpx;
			}

			.next {
				margin-left: 30rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);

			view {
				flex: 1;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			transition: height 0.4s ease;

			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					height: 80rpx;
					line-height: 80rpx;
					width: calc(100% / 7);

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						overflow: hidden;
						border-radius: 60rpx;
						position: relative;
						z-index: 200;
						&.nolm {
							color: #fff;
							opacity: 0.3;
						}
					}
					.markDayBg{
						position: absolute;
						top: 0;
						width: 100%;
						height: 100%;
						border-radius: 50%;
						z-index: 100;
						background: #fc7a64;
					}
				}
			}
		}

		.hide {
			height: 80rpx !important;
		}

		.top {
			text-align: start;
			justify-content: space-between;
			height: 80rpx;
			background: linear-gradient(360deg, #ffffff 0%, #e9f8ff 100%);
			padding: 0 30rpx;
			font-size: 30rpx;
			color: #111111;
		}
	}
</style>