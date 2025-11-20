let jobCounter = 0;
let jobsCompleted = 0;
let jobQueue = [];

// Job class
class Job {
    constructor(id, description, priority) {
        this.id = id;
        this.description = description;
        this.priority = parseInt(priority);
        this.timestamp = Date.now();
    }
}

// Priority color classes
function getPriorityColorClass(priority) {
    switch (priority) {
        case 1: return 'p1-border bg-red-50';
        case 2: return 'p2-border bg-orange-50';
        case 3: return 'p3-border bg-yellow-50';
        case 4: return 'p4-border bg-blue-50';
        case 5: return 'p5-border bg-green-50';
        default: return 'bg-gray-50';
    }
}

// Show custom alert
function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    const modal = document.getElementById('alertModal');
    modal.classList.remove('hidden');
}

function closeAlert() {
    document.getElementById('alertModal').classList.add('hidden');
}

// Stats update
function updateStatsBoxes() {
    document.getElementById('statTotal').textContent = jobCounter;
    document.getElementById('statPending').textContent = jobQueue.length;
    document.getElementById('statCompleted').textContent = jobsCompleted;
}

// Highest priority job (lowest priority number + oldest timestamp)
function findHighestPriorityJobIndex() {
    if (jobQueue.length === 0) return -1;

    let bestIndex = 0;
    let bestPriority = jobQueue[0].priority;
    let bestTime = jobQueue[0].timestamp;

    for (let i = 1; i < jobQueue.length; i++) {
        let job = jobQueue[i];

        if (job.priority < bestPriority || 
            (job.priority === bestPriority && job.timestamp < bestTime)) {

            bestIndex = i;
            bestPriority = job.priority;
            bestTime = job.timestamp;
        }
    }

    return bestIndex;
}

// Update queue display


// Job class
class Job {
    constructor(id, description, priority) {
        this.id = id;
        this.description = description;
        this.priority = parseInt(priority);
        this.timestamp = Date.now();
    }
}

// Priority color classes
function getPriorityColorClass(priority) {
    switch (priority) {
        case 1: return 'p1-border bg-red-50';
        case 2: return 'p2-border bg-orange-50';
        case 3: return 'p3-border bg-yellow-50';
        case 4: return 'p4-border bg-blue-50';
        case 5: return 'p5-border bg-green-50';
        default: return 'bg-gray-50';
    }
}

// Show custom alert
function showCustomAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    const modal = document.getElementById('alertModal');
    modal.classList.remove('hidden');
}

function closeAlert() {
    document.getElementById('alertModal').classList.add('hidden');
}

// Stats update
function updateStatsBoxes() {
    document.getElementById('statTotal').textContent = jobCounter;
    document.getElementById('statPending').textContent = jobQueue.length;
    document.getElementById('statCompleted').textContent = jobsCompleted;
}

// Highest priority job (lowest priority number + oldest timestamp)
function findHighestPriorityJobIndex() {
    if (jobQueue.length === 0) return -1;

    let bestIndex = 0;
    let bestPriority = jobQueue[0].priority;
    let bestTime = jobQueue[0].timestamp;

    for (let i = 1; i < jobQueue.length; i++) {
        let job = jobQueue[i];

        if (job.priority < bestPriority || 
            (job.priority === bestPriority && job.timestamp < bestTime)) {

            bestIndex = i;
            bestPriority = job.priority;
            bestTime = job.timestamp;
        }
    }

    return bestIndex;
}

// Update queue display
function updateQueueUI() {
    const queueContainer = document.getElementById('jobQueue');
    const emptyMessage = document.getElementById('emptyMessage');

    // First hide all existing job items (but do NOT delete emptyMessage)
    // Remove only dynamically created job items, not the emptyMessage.
    Array.from(queueContainer.children).forEach(child => {
        if (child.id !== "emptyMessage") {
            child.remove();
        }
    });

    if (jobQueue.length === 0) {
        emptyMessage.classList.remove('hidden');
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }

    // Sort display
    const sortedDisplayQueue = [...jobQueue].sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.timestamp - b.timestamp;
    });

    // Add job tiles
    sortedDisplayQueue.forEach(job => {
        const colorClass = getPriorityColorClass(job.priority);
        const jobElement = document.createElement('div');
        jobElement.className = `job-item ${colorClass} p-3 rounded-lg flex justify-between items-center`;

        jobElement.innerHTML = `
            <div class="flex-grow min-w-0">
                <p class="text-lg font-medium text-gray-900 truncate">${job.description}</p>
                <p class="text-sm text-gray-500">ID: ${job.id} | Priority: ${job.priority}</p>
            </div>
            <span class="flex-shrink-0 ml-4 font-bold text-lg">${job.priority}</span>
        `;

        queueContainer.appendChild(jobElement);
    });

    updateStatsBoxes();
}


// Event listeners
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("addJobBtn").addEventListener("click", () => {
        const desc = document.getElementById("jobDescription").value.trim();
        const priority = document.getElementById("jobPriority").value;

        if (!desc) {
            showCustomAlert("Please enter a job description.");
            return;
        }

        jobCounter++;
        jobQueue.push(new Job(jobCounter, desc, priority));

        document.getElementById("jobDescription").value = "";
        document.getElementById("jobPriority").value = "3";

        updateQueueUI();
    });

    document.getElementById("processJobBtn").addEventListener("click", () => {
        const index = findHighestPriorityJobIndex();
        const processingText = document.getElementById("processingText");

        if (index === -1) {
            processingText.textContent = "No job currently being processed.";
            return;
        }

        const job = jobQueue.splice(index, 1)[0];
        jobsCompleted++;

        processingText.innerHTML = `
            <span class="text-green-700 font-bold text-xl">Processing:</span>
            <span class="text-gray-800 text-xl"> ${job.description}</span>
            <span class="text-sm text-gray-500">(P${job.priority})</span>
        `;

        updateQueueUI();
    });

    updateQueueUI();
});

// Event listeners
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("addJobBtn").addEventListener("click", () => {
        const desc = document.getElementById("jobDescription").value.trim();
        const priority = document.getElementById("jobPriority").value;

        if (!desc) {
            showCustomAlert("Please enter a job description.");
            return;
        }

        jobCounter++;
        jobQueue.push(new Job(jobCounter, desc, priority));

        document.getElementById("jobDescription").value = "";
        document.getElementById("jobPriority").value = "3";

        updateQueueUI();
    });

    document.getElementById("processJobBtn").addEventListener("click", () => {
        const index = findHighestPriorityJobIndex();
        const processingText = document.getElementById("processingText");

        if (index === -1) {
            processingText.textContent = "No job currently being processed.";
            return;
        }

        const job = jobQueue.splice(index, 1)[0];
        jobsCompleted++;

        processingText.innerHTML = `
            <span class="text-green-700 font-bold text-xl">Processing:</span>
            <span class="text-gray-800 text-xl"> ${job.description}</span>
            <span class="text-sm text-gray-500">(P${job.priority})</span>
        `;

        updateQueueUI();
    });

    updateQueueUI();

});
