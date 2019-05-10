## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|-------|
|image|string|-------|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
