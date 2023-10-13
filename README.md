# Schedule generator
Schedule config generator


# INFO
Schedule config-file generator for [telegram bot](https://t.me/billyknt113_bot).
The bot allows students to create a config of their class schedule and easily view it through the bot in their group.

# How to use
## Web
* Once you log into the website, you will be taken to the `call scheduling settings tab`. It is configured by default, but you can edit it.
* On the `Timetable` tab you will see the schedule settings for the days of the week. Also the ability to edit the second week
     - __Why the second week? And what is this.__
     - In some universities, training alternates between weeks. One has one pattern, the other has another. This is designed to rotate the schedule in the bot `automatically`
* You can add lessons to each day and customize them (`*Title, links, teacher, additional information and lesson type`)
    - `P.S.:` You can split the lesson in two. Add a `|` separator in the title and link. For example, useful when dividing into sub-groups.
    - If there is no lesson. Leave the `Name and link` fields empty, it will be ignored by the bot
* After completely setting up your schedule, click the `Save` button and you will download the schedule file. *Send it to the bot for use*
* For convenient editing, the `Edit schedule` button has been created. By clicking on it you need to `select your file with the schedule` and it will be uploaded to the site. After which you can edit it and upload the already corrected one.

## Bot
* Add it to your group and give it `Administrator rights`
* Next, simply send him the config file that you received from [the site](https://github.com/drhspfn/sgenerator). `The bot notifies that the schedule has been updated`
* Just use the command `/schedule`
   - With a simple call, it will show the schedule for the current day
   - After the command, you can specify the numeric index of the day (`1-7`). For example: `/schedule 1` - Shows Monday
  
### Disclaimer
__This bot does not provide the ability to read/save our dialogues, files or other content present in your group. The bot is only authorized to respond to certain commands__ [`/help`, `/schedule`]


# Known Issues
* Both the generator and the bot are not intended for a weekly schedule.
     -  Fix - `Copy the list from numerator to denominator in the schedule file.`


# Links
* [Schedule generator](https://github.com/drhspfn/sgenerator)
* [Telegram Bot / Mr. Billy Herrington](https://t.me/billyknt113_bot)
* [Developer DM](https://t.me/drhspfn)
