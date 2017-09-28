# lazy-more-filter
## Features:
* lazy-calculate
* multiple-filters
* sort

## update logs
* 2016/11/21 - add sort feature: able to sort data in each filter, for more detail, please check [lazy-more-filter.ts](https://github.com/josephmeng/lazy-more-filter/blob/master/src/lazy-more-filter.ts#L78-L82);


## How to run and test it
Run _npm start_ in root path and modify test.ts file (modify dummy data and test case), console will print result automatically. 
For more details, please see src/test.ts file.

Citi Smart Office App （以下简称App）
1. 当用户到达办公室门口时，App会根据用户的提前设定来分配座位。例如用户设定了优先选择西区靠窗的位置，那么系统就会优先为用户寻找西区靠窗的座位，并把分配结果发送给用户，用户可以确认分配结果或取消分配自主选择座位。
2. 当用户到达座位后，App会使用该用户的账号和密码自动为用户解锁电脑并登陆系统。App还会根据用户的提前设定或喜好来为用户调节系统的配置（例如调节显示器的亮度，系统字体大小，自动打开Applications 等）
3. 当用户开始投入到日常工作中时，App会为用户从collaborate、outlook、lync、wiki、citi.net、Bitbucket、JIRA等爬取一些用户关注的、感兴趣的内容，并提供全站搜索功能，为用户提供一个简单、快捷、精准的信息查询入口。
4. 当用户需要查找某个座位在办公室中的具体位置时，App会根据用户当前在办公室中的位置规划出一条路径，并为用户提供导航功能。该功能还能为用户查找会议室、急救箱、打印机等位置。
5. 当日常工作中遇到紧急突发事件时，App会根据用户当前在办公室中的位置规划出一条建议紧急逃生路线并提供导航功能。
6. 当用户需要占用会议室时，App会提供当前所有会议室的使用情况，为用户提供实时监测，当有合适的会议室被释放时，App会提醒用户。同样的功能也适用于打印机使用情况实时监测、Panrty room微波炉使用情况监测、厕所使用情况监测等。
7. 当用户下班离开办公室后，App会为用户自动锁住电脑并登出系统，还原初始化设置。用户的座位也会被释放。
