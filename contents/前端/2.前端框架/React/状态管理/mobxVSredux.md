## mobx VS redux

### 区别
1. 设计理念
   - Redux使用单一不可变状态树的设计理念，所有状态都被保存在一个全局的store中，通过`dispatch`一个action来触发状态的改变
   - mobx更加灵活，可以使用可观察的数据结构，只需要对观察的状态进行跟踪，状态可以分布在不同的地方。
2. 代码复杂度
   - Redux相对来说比较严格和规范，需要编写大量的模板代码，比如定义action和reducer函数等
   - Mbox相对更加简洁，可以通过装饰器或者函数式的方式来实现状态管理，减少了一些样板代码。
3. 数据流
   - Redux使用单向数据流的方式，通过`dispatch`一个action的方式来触发状态的改变，然后通过reducer函数来处理状态的变化并返回新的状态
   - Mbox则使用响应式数据流，当状态发生变化时，相关的组件才会被更新。
4. 性能优化
   - Redux使用不可变数据的设计，通过比较前后两个状态的差异来判断是否需要更新组件，可以更好的优化性能。
   - Mobx使用观察者模式，只有被观察的状态发生改变时，相关的组件才会被更新
5. 学习曲线：
   - Redux相对来说学习曲线比较陡峭，需要了解一些概念，比如action，reducer，中间件等
   - Mobx更见简单、直观，没有太多额外的概念。

### 参考
- https://developer.aliyun.com/article/1412907#:~:text=%E4%BD%BF%E7%94%A8React%20Mbox%EF%BC%8C%E5%BC%80%E5%8F%91%E8%80%85%E5%8F%AF%E4%BB%A5%E5%B0%86%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E7%9A%84%E7%8A%B6%E6%80%81%E6%8A%BD%E8%B1%A1%E4%B8%BA%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E7%9A%84%E7%8A%B6%E6%80%81%E6%A0%91%EF%BC%8C%E5%B9%B6%E9%80%9A%E8%BF%87%E5%AE%9A%E4%B9%89%E5%92%8C%E6%93%8D%E4%BD%9C%E7%8A%B6%E6%80%81%E6%9D%A5%E5%AE%9E%E7%8E%B0%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%AB%E5%92%8C%E9%80%9A%E4%BF%A1%E3%80%82%20React,Mbox%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E6%98%AFstore%E5%92%8Caction%E3%80%82%20store%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8C%85%E5%90%AB%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E7%8A%B6%E6%80%81%E7%9A%84%E5%AF%B9%E8%B1%A1%EF%BC%8C%E5%AE%83%E5%8F%AF%E4%BB%A5%E8%A2%AB%E7%BB%84%E4%BB%B6%E8%AE%BF%E9%97%AE%E5%92%8C%E4%BF%AE%E6%94%B9%E3%80%82%20action%E6%98%AF%E4%B8%80%E4%B8%AA%E6%8F%8F%E8%BF%B0%E7%8A%B6%E6%80%81%E5%8F%98%E5%8C%96%E7%9A%84%E5%AF%B9%E8%B1%A1%EF%BC%8C%E5%AE%83%E5%8F%AF%E4%BB%A5%E8%A7%A6%E5%8F%91%E5%AF%B9%E5%BA%94%E7%9A%84%E7%8A%B6%E6%80%81%E6%9B%B4%E6%96%B0%E6%93%8D%E4%BD%9C%E3%80%82