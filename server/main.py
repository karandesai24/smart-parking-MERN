import cv2
import pickle
import cvzone
import numpy as np

# Video feed
cap = cv2.VideoCapture('carPark.mp4')

with open('CarParkPos', 'rb') as f:
    posList = pickle.load(f)

width, height = 107, 48
sp=[]


def checkParkingSpace(imgPro):
    spaceCounter = 0
    z=1



    for pos in posList:
        x, y = pos

        imgCrop = imgPro[y:y + height, x:x + width]
        # cv2.imshow(str(x * y), imgCrop)
        count = cv2.countNonZero(imgCrop)

        if count < 900:
                ans=[]

                color = (0, 255, 0)
                thickness = 5
                ans.append(z)
                #print(ans)


                z+=1
                #ans.append(spaceCounter)
                for i in ans:
                   print(i, sep=' ', end=' ')
               # fo = open("fo.txt", "w")
                #for i in ans:
                 #   line = fo.write(str(i))
                #fo.close()

        else:
                  z += 1



            #color = (0, 0, 255)
            #thickness = 2
            #spaceCounter += 1




       # cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
        #cvzone.putTextRect(img, str(count), (x, y + height - 3), scale=1,
         #                  thickness=2, offset=0, colorR=color)
    #print(s)
    #print(len(imgCrop))



    #return spaceCounter

    #cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3,
                      # thickness=5, offset=20, colorR=(0, 200, 0))





c=1
if c>0:

    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    success, img = cap.read()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                         cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    kernel = np.ones((3, 3), np.uint8)
    imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

    checkParkingSpace(imgDilate)
    #cv2.imshow("Image", img)
    #cv2.imshow("ImageBlur", imgBlur)
    #cv2.imshow("ImageThres", imgMedian)
   # if cv2.waitKey(10)& 0xFF == ord("q"):

        #break

#x=checkParkingSpace(imgDilate)
#print(x)

cap.release()
cv2.destroyAllWindows()