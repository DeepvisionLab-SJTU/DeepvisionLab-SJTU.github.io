import { changeColor } from 'seemly'
import { Ref } from 'vue';


const highcolor = '#d03050';
const middlecolor = '#f0a020';
const lowcolor = '#18a058';
const highcolorDark = '#e88080';
const middlecolorDark = '#f2c97d';
const lowcolorDark = '#63e2b7';

export function parseSize(sizeStr: string): number {
    const size = parseFloat(sizeStr);
    if (sizeStr.includes('TB')) {
        return size * 1024 * 1024 * 1024 * 1024;
    } else if (sizeStr.includes('GB')) {
        return size * 1024 * 1024 * 1024;
    } else if (sizeStr.includes('MB')) {
        return size * 1024 * 1024;
    } else if (sizeStr.includes('KB')) {
        return size * 1024;
    } else {
        return size;
    }
}

export function getPercLevelLight(percent: number, alphaValue: number = 0.9): string {
    if (percent > 89.0) {
        return changeColor('#d03050', { alpha: alphaValue })
    } else if (percent > 59.0) {
        return changeColor('#f0a020', { alpha: alphaValue })
    } else {
        return changeColor('#18a058', { alpha: alphaValue })
    }
}

export function getPercLevel(percent: number, alphaValue: number = 0.9): string {
    if (percent > 89.0) {
        return changeColor('#e88080', { alpha: alphaValue })
    } else if (percent > 59.0) {
        return changeColor('#f2c97d', { alpha: alphaValue })
    } else {
        return changeColor('#63e2b7', { alpha: alphaValue })
    }
}

//export function getDiskData(data: object, diskType: string): object {
//    const result = data.filter(disk => (disk.type === diskType)&&(!disk.mountpoint.includes('boot')))
//                            .reduce(
//                                (acc, disk) => {
//                                    acc.totalSize += disk.usage.total;
//                                    acc.totalAvail += disk.usage.free;
//                                    acc.totalUsed += disk.usage.used;
//                                    return acc;
//                                },
//                                { totalSize: 0, totalAvail: 0, totalUsed: 0}
//                            );
    
//    result.totalSizeReadable = (result.totalSize / (1024 * 1024 * 1024)).toFixed(2);
//    result.totalAvailReadable = (result.totalAvail / (1024 * 1024 * 1024)).toFixed(2);
//    result.totalUsedReadable = (result.totalUsed / (1024 * 1024 * 1024)).toFixed(2);
//    result.totalPercReadable = (result.totalUsedReadable / result.totalSizeReadable * 100).toFixed(2);

//    result.barColor = getPercLevel(result.totalPercReadable, 0.9)
    
//    return result
//}

export function getDiskData(data: object[], diskType: string): object {
    // 初始化结果对象
    const result = {
        totalSize: 0,
        totalAvail: 0,
        totalUsed: 0,
        totalSizeReadable: '0.00',
        totalAvailReadable: '0.00',
        totalUsedReadable: '0.00',
        totalPercReadable: '0.00',
        barColor: '',
        disks: []  // 用于存储每个磁盘的详细信息
    };

    // 临时存储各个磁盘的使用信息
    const usageList = [];

    // 过滤符合条件的磁盘并记录使用信息和mountpoint
    data.filter(disk => (disk.type === diskType) && (!disk.mountpoint.includes('boot')))
        .forEach(disk => {
            usageList.push(disk.usage);
            result.disks.push({
                mountpoint: disk.mountpoint,
                totalReadable: (disk.usage.total / (1024 * 1024 * 1024 * 1024)).toFixed(2),
                usedReadable: (disk.usage.used / (1024 * 1024 * 1024 * 1024)).toFixed(2),
            });
        });

    // 计算总量
    result.totalSize = usageList.reduce((acc, usage) => acc + usage.total, 0);
    result.totalAvail = usageList.reduce((acc, usage) => acc + usage.free, 0);
    result.totalUsed = usageList.reduce((acc, usage) => acc + usage.used, 0);

    // 转换为可读格式
    result.totalSizeReadable = (result.totalSize / (1024 * 1024 * 1024)).toFixed(2);
    result.totalAvailReadable = (result.totalAvail / (1024 * 1024 * 1024)).toFixed(2);
    result.totalUsedReadable = (result.totalUsed / (1024 * 1024 * 1024)).toFixed(2);
    result.totalPercReadable = ((result.totalUsed / result.totalSize) * 100).toFixed(2);

    // 设置进度条颜色
    result.barColor = getPercLevel(result.totalPercReadable, 0.9);

    return result;
}

export function getModalStat(showModal, nodeid, click): Ref {
    if (click){
        showModal[nodeid] = true
    }
        
    return showModal[nodeid]
}