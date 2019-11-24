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
- has_many :groups_users

##messeageテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Assosiation
- belongs_to :user
- belongs_to :group

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

###Assosiation
- has_many :messeages
- has_many : users, throuth: :groups_users
- has_many :groups_users

##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key :true|
|group_id|integer|null: false, foreign_key :true|

###Assosiation
- belongs_to :user
- belongs_to :group