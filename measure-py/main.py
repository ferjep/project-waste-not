from datetime import datetime
import time
import requests

def getHumanReadableDiff(diff):
    #14400 = 4 hours, sets date from 20:00:00 to 00:00:00
    dateStr = datetime.fromtimestamp(diff + 14400).strftime('%-d:%-H:%-M:%-S:%f')
    dateArr = dateStr.split(':')

    outputArr = []

    if (diff >= 0):
        ms = dateArr[4][0:3].lstrip('0')

        if (len(ms) and int(ms) > 0):
            outputArr.insert(0, ms + ' ms')

    if (diff >= 1):
        outputArr.insert(0, dateArr[3] + ' seconds')

    if (diff >= 60):
        outputArr.insert(0, dateArr[2] + ' minutes')

    if (diff >= 3600):
        outputArr.insert(0, dateArr[1] + ' hours')

    if (diff >= 86300):
        outputArr.insert(0, dateArr[0] + ' days')

    separator = ', '
    return separator.join(outputArr)

start = time.time()

# Heavy code here
for x in range(5):
    requests.get('https://jsonplaceholder.typicode.com/todos/1')

end = time.time()

# diff = getHumanReadableDiff(end - start)
diff = getHumanReadableDiff(0)

print('Code took: ', diff, ' to execute')
