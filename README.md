#chat-space DB設計

##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: faise|
|password|string|null: false|

###Assosiation
- has_many :messeages
- has_many :groups, throuth: :groups_users

##messeageテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|

###Assosiation
- belongs_to :user
- belongs_to :group

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|
|user_id|integer|null: false, foreign_key :true|
|tweet_id|integer|null: false, foregin_key :true|

###Assosiation
- belongs_to :messeage
- has_many : users, throuth: :groups_users

##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key :true|
|group_id|integer|null: false, foreign_key :true|

###Assosiation
- belongs_to :user
- belongs_to :group